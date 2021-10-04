import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function deleteTask(taskId: string) {
  const userUID = await auth().currentUser?.uid;

  if (userUID) {
    const database = firestore();
    return database.collection('tasks').doc(taskId).delete();
  }

  return Promise.reject(new Error('User not found'));
}
