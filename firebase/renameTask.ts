import {auth, database} from '../App';

export async function renameTask(taskId: string, newTitle: string) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return database.collection('tasks').doc(taskId).update({
      title: newTitle,
    });
  }

  return Promise.reject(new Error('User not found'));
}
