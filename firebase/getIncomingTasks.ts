import {auth, database} from '../App';
import {Task} from '../types';
export async function getIncomingTasks() {
  const userUID = auth.currentUser?.uid;

  if (userUID) {
    const currentDate = new Date();
    return database
      .collection('tasks')
      .where('userUID', '==', userUID)
      .where('completed', '==', false)
      .where('date', '>', currentDate)
      .get()
      .then(snapshot =>
        snapshot.docs.map(
          doc => ({id: doc.id, ...doc.data()} as unknown as Task),
        ),
      );
  }

  return Promise.reject(new Error('User not found'));
}
