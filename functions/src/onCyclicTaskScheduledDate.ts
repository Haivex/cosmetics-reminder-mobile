import {firestore} from "firebase-admin";
import {convertCyclicIntervalToSeconds} from "./helpers/cyclicIntervalConverter";

export const onCyclicTaskScheduledDate = (
  snapshot: firestore.QueryDocumentSnapshot<firestore.DocumentData>
): Promise<firestore.DocumentReference<firestore.DocumentData>> => {
  const task = snapshot.data();
  const nextDate =
    new firestore.Timestamp(
      task.date.seconds,
      task.date.nanoseconds
    ).toMillis() +
    convertCyclicIntervalToSeconds(task.cyclicInterval) * 1000;
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
