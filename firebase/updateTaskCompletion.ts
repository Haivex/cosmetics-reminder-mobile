import {database} from '../App';

export async function updateTaskCompletion(taskId: string, completed: boolean) {
  return database.collection('tasks').doc(taskId).update({completed});
}
