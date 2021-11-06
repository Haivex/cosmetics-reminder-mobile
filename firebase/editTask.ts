import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TaskData} from '../screens/TaskCreationScreen';

export async function editTask(taskId: string, taskData: Partial<TaskData>) {
  const userUID = auth().currentUser?.uid;

  if (userUID) {
    const database = firestore();
    return database
      .collection('tasks')
      .doc(taskId)
      .update({
        ...taskData,
        cyclicInterval:
          taskData.cyclicInterval || firestore.FieldValue.delete(),
      });
  }

  return Promise.reject(new Error('User not found'));
}
