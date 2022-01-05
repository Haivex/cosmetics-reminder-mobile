import {auth, database, firebaseApp} from '../App';
import {TaskData} from '../screens/TaskCreationScreen';

export async function editTask(taskId: string, taskData: Partial<TaskData>) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return database
      .collection('tasks')
      .doc(taskId)
      .update({
        ...taskData,
        cyclicInterval:
          taskData.cyclicInterval || firebaseApp.firestore.FieldValue.delete(),
      });
  }

  return Promise.reject(new Error('User not found'));
}
