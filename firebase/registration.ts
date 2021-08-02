import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import { UserInfo } from '../redux/LoginReducer';

export async function registration(userInfo: UserInfo) {
  try {
    await firebase.auth().signInWithCredential(userInfo.authData.credential);
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const db = firebase.firestore();
      db.collection('users')
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
          firstName: currentUser?.displayName || '',
        });
    }
  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message);
  }
}
