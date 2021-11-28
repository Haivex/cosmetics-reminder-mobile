import {firestore} from "firebase-admin";
import {convertCyclicIntervalToSeconds} from "./helpers/cyclicIntervalConverter";

export const onCyclicTaskScheduledDate = (
  snapshot: firestore.QueryDocumentSnapshot<firestore.DocumentData>
): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  const task = snapshot.data();
  const nextDate =
    Date.now() + convertCyclicIntervalToSeconds(task.cyclicInterval) * 10000;
  return snapshot.ref.update({originTaskId: snapshot.id}).then(() => {
    return firestore()
      .collection("tasks")
      .add({
        ...task,
        completed: false,
        originTaskId: snapshot.id,
        date: new Date(nextDate),
      });
  });
};