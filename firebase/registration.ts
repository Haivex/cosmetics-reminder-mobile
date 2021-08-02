import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

export async function registration(user: firebase.User) {
  try {
    const db = firebase.firestore();
    db.collection('users')
      .doc(user.uid)
      .set({
        email: user.email,
        firstName: user?.displayName || '',
      });
  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message);
  }
}
