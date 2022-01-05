import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {set} from 'date-fns';
import {TaskData} from '../screens/TaskCreationScreen';
import {Task, TaskCreationData} from '../types';

type TaskDocument =
  | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  | FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

export function convertTaskDocumentToTask(taskDocument: TaskDocument): Task {
  return {
    id: taskDocument.id,
    ...taskDocument.data(),
  } as Task;
}

export function convertTaskFormDataToTaskCreationData(
  taskFormData: TaskData,
): TaskCreationData {
  return {
    title: taskFormData.title,
    date: set(taskFormData.date as Date, taskFormData.time),
    cyclicInterval: taskFormData.cyclicInterval,
  };
}

export function convertTaskCreationDataToUpdatedTask(
  taskCreationData: TaskCreationData,
  task: Task,
): Task {
  return {
    id: task.id,
    completed: task.completed,
    title: taskCreationData.title,
    cyclicInterval: taskCreationData.cyclicInterval,
    date: FirebaseFirestoreTypes.Timestamp.fromDate(taskCreationData.date),
  };
}
