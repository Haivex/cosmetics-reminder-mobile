import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import removeUndefinedKeys from '../helpers/removeUndefinedKeys';
import {Task} from '../redux/TodosReducer';

export async function editTask(
  taskId: string,
  taskData: Omit<Task, 'id' | 'completed'>,
) {
  const userUID = await auth().currentUser?.uid;

  if (userUID) {
    const taskWithoutUndefinedKeys = removeUndefinedKeys(taskData);
    const database = firestore();
    return database
      .collection('tasks')
      .doc(taskId)
      .update({
        ...taskWithoutUndefinedKeys,
        cyclicInterval:
          taskData.cyclicInterval || firestore.FieldValue.delete(),
      });
  }

  return Promise.reject(new Error('User not found'));
}
