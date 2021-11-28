import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {onCyclicTaskScheduledDate} from "./onCyclicTaskScheduledDate";

export const taskRunner = functions
  .runWith({memory: "2GB"})
  .pubsub.schedule("* * * * *")
  .onRun(async () => {
    functions.logger.info("Running pub sub function...");
    // Consistent timestamp
    const now = admin.firestore.Timestamp.now();

    const db = admin.firestore();

    // Query all documents ready to perform
    const query = db
      .collection("tasks")
      .where("date", "<=", now)
      .where("originTaskId", "==", null)
      .orderBy("date")
      .orderBy("cyclicInterval");

    const tasks = await query.get();

    // Jobs to execute concurrently.
    const jobs: Promise<unknown>[] = [];

    // Loop over documents and push job.
    tasks.forEach((snapshot) => {
      const job = onCyclicTaskScheduledDate(snapshot);

      jobs.push(job);
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });
