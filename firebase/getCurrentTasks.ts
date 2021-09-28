import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TaskDocumentWithId} from './firestoreTypes';

export async function getCurrentTasks(): Promise<TaskDocumentWithId[]> {
  const userUID = await auth().currentUser?.uid;

  if (userUID) {
    //const currentDate = new Date();
    const database = firestore();
    const data = await database
      .collection('tasks')
      .get()
      .then(
        querySnapshot =>
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as unknown as TaskDocumentWithId[],
      );
    return data;
  }

  return Promise.reject(new Error('User not found'));
}
