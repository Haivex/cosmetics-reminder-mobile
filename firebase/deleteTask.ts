import {auth, db} from '../App';

export async function deleteTask(taskId: string) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return db.collection('tasks').doc(taskId).delete();
  }

  return Promise.reject(new Error('User not found'));
}
