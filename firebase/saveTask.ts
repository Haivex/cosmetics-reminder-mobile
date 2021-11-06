import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TaskData} from '../screens/TaskCreationScreen';

export async function saveTask(task: Partial<TaskData>) {
  const userUID = auth().currentUser?.uid;

  if (userUID) {
    const database = firestore();
    return (
      await database
        .collection('tasks')
        .add({...task, completed: false, userUID})
    ).get();
  }

  return Promise.reject(new Error('User not found'));
}
