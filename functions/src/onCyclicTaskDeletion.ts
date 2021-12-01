import {firestore} from "firebase-admin";
import * as functions from "firebase-functions";

export const onCyclicTaskDeletion = functions.firestore
  .document("tasks/{taskId}")
  .onDelete((snapshot) => {
    const task = snapshot.data();
    if (task.cyclicInterval) {
      return firestore()
        .collection("tasks")
        .where("originTask", "==", snapshot.id)
        .get()
        .then((snapshots) =>
          snapshots.forEach((snapshot) => snapshot.ref.delete())
        );
    }
    return null;
  });
