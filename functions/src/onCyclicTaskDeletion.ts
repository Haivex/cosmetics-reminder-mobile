import {firestore} from "firebase-admin";
import * as functions from "firebase-functions";

export const onCyclicTaskDeletion = functions.firestore
  .document("tasks/{taskId}")
  .onDelete((snapshot) => {
    const task = snapshot.data();
    if (task.cyclicInterval) {
      const originTaskIdFromPropertyOrDocumentId = task.originTaskId ? task.originTaskId : snapshot.id;
      return firestore()
        .collection("tasks")
        .where("originTaskId", "==", originTaskIdFromPropertyOrDocumentId)
        .get()
        .then((snapshots) =>
          snapshots.forEach((otherSnapshot) => otherSnapshot.ref.delete({exists: true}))
        );
    }
    return null;
  });
