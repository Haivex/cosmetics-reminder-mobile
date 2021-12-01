import {firestore} from "firebase-admin";
import * as functions from "firebase-functions";

export const onCyclicTaskUpdate = functions.firestore
  .document("tasks/{taskId}")
  .onUpdate((documentChange) => {
    const {before, after} = documentChange;
    const oldTask = before.data();
    const newTask = after.data();
    if (before.isEqual(after)) {
      return null;
    }
    if (oldTask.cyclicInterval && newTask.cyclicInterval) {
      firestore()
        .collection("tasks")
        .where("originTaskId", "==", oldTask.originTaskId)
        .get()
        .then((snapshots) =>
          snapshots.forEach((snapshot) => snapshot.ref.update({...newTask}))
        );
      return null;
    }
    if (oldTask.cyclicInterval && !newTask.cyclicInterval) {
      firestore()
        .collection("tasks")
        .where("originTaskId", "==", oldTask.originTaskId)
        .get()
        .then((snapshots) =>
          snapshots.forEach((snapshot) => snapshot.ref.delete())
        );
      return null;
    }
    return null;
  });
