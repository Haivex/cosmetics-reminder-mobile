import {db} from '../App';

export async function updateTaskCompletion(taskId: string, completed: boolean) {
  return db.collection('tasks').doc(taskId).update({completed});
}
