import firestore from '@react-native-firebase/firestore';

export async function updateTaskCompletion(taskId: string, completed: boolean) {
  const database = firestore();
  return database.collection('tasks').doc(taskId).update({completed});
}
