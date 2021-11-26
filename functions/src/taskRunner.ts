// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import {onCyclicTaskScheduledDate} from "./onCyclicTaskScheduledDate";

// const db = admin.firestore();

// export const taskRunner = functions.runWith( {memory: "256MB"}).pubsub

//     .schedule("* * * * *").onRun(async () => {
//       // Consistent timestamp
//       const now = admin.firestore.Timestamp.now();

//       // Query all documents ready to perform
//       const query = db.collection("tasks")
//           .where("beginningDate", "<=", now).orderBy("cyclicInterval");

//       const tasks = await query.get();


//       // Jobs to execute concurrently.
//       const jobs: Promise<unknown>[] = [];

//       // Loop over documents and push job.
//       tasks.forEach((snapshot) => {
//         const job = onCyclicTaskScheduledDate(snapshot);

//         jobs.push(job);
//       });

//       // Execute all jobs concurrently
//       return await Promise.all(jobs);
//     });
