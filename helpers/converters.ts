import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {set} from 'date-fns';
import {TaskData} from '../screens/TaskCreationScreen';
import {Task, TaskCreationData} from '../types';

type TaskDocument =
  | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  | FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

export function convertTaskDocumentToTask(taskDocument: TaskDocument): Task {
  const createdTask = {
    id: taskDocument.id,
    ...taskDocument.data(),
  } as Task;
  return createdTask;
}

export function convertTaskFormDataToTaskCreationData(
  taskFormData: TaskData,
): TaskCreationData {
  const createdTaskCreationData = {
    title: taskFormData.title,
    date: set(taskFormData.date as Date, taskFormData.time),
    cyclicInterval: taskFormData.cyclicInterval,
  };
  return createdTaskCreationData;
}
