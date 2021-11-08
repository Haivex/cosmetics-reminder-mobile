import {auth, db} from '../App';

export async function renameTask(taskId: string, newTitle: string) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return db.collection('tasks').doc(taskId).update({
      title: newTitle,
    });
  }

  return Promise.reject(new Error('User not found'));
}
