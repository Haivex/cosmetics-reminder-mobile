import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function renameTask(taskId: string, newTitle: string) {
  const userUID = auth().currentUser?.uid;

  if (userUID) {
    const database = firestore();
    return database.collection('tasks').doc(taskId).update({
      title: newTitle,
    });
  }

  return Promise.reject(new Error('User not found'));
}
