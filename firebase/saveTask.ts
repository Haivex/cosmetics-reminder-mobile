import {auth, database} from '../App';
import {TaskData} from '../screens/TaskCreationScreen';

export async function saveTask(task: Partial<TaskData>) {
  const userUID = auth.currentUser?.uid;
  if (userUID) {
    return database
      .collection('tasks')
      .add({...task, completed: false, userUID})
      .then(doc => doc.get());
  }

  return Promise.reject(new Error('User not found'));
}
