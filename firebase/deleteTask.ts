import {auth, database} from '../App';

export async function deleteTask(taskId: string) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return database.collection('tasks').doc(taskId).delete();
  }

  return Promise.reject(new Error('User not found'));
}
