import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";

export const onCyclicTaskCreation = functions.firestore.
    document("tasks/{taskId}")
    .onCreate((snapshot) => {
      const task = snapshot.data();
      if (!task.originTaskId) {
          return firestore().doc(`tasks/${snapshot.id}`).update({originTaskId: null});
      }
      return null;
    });
