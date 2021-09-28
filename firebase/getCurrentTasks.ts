import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function getCurrentTasks() {
  const userUID = await auth().currentUser?.uid;

  if (userUID) {
    //const currentDate = new Date();
    const database = firestore();
    return (
      (await database.collection('tasks'))
        // .where('completed', '==', false)
        // .where('date', '<=', currentDate.getTime())
        .get()
        .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    );
  }

  return Promise.reject(new Error('User not found'));
}
