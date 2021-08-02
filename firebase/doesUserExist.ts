import firebase from 'firebase';
import 'firebase/firestore';

const doesUserExist = async () => {
    let db = firebase.firestore();
    const querySnapshot = await db.collection('users').where('email', '==', 'given@email.com').get();
    return !querySnapshot.empty;
}

export default doesUserExist;
