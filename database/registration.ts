import firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";
import { UserInfo } from '../redux/LoginReducer';

export async function registration(userInfo: UserInfo) {
    try {
        await firebase.auth().signInWithCredential(userInfo.authData.credential)
        const currentUser = firebase.auth().currentUser;
    
        const db = firebase.firestore();
        db.collection("users")
          .doc(currentUser.uid)
          .set({
            email: currentUser.email,
            lastName: lastName,
            firstName: firstName,
          });
      } catch (err) {
        Alert.alert("There is something wrong!!!!", err.message);
      }
}
