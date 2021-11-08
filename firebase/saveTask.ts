import {auth, db} from '../App';
import {TaskData} from '../screens/TaskCreationScreen';

export async function saveTask(task: Partial<TaskData>) {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    return (
      await db.collection('tasks').add({...task, completed: false, userUID})
    ).get();
  }

  return Promise.reject(new Error('User not found'));
}
