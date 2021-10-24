import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {combineReducers} from '@reduxjs/toolkit';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer, FirestoreReducer} from 'redux-firestore';
import NotificationsReducer, {NotificationState} from './NotificationsReducer';
import TodosReducer, {TodosState} from './TodosReducer';
import UserReducer, {CurrentUser} from './UserReducer';

interface Profile {
  name: string;
  email: string;
}

interface CyclicInterval {
  minutes?: number;
  hours?: number;
  days?: number;
}

interface Tasks {
  title: string;
  completed: boolean;
  date: FirebaseFirestoreTypes.Timestamp;
  userUID: string;
  cyclicInterval?: CyclicInterval;
}

interface FirebaseSchema {
  tasks: Tasks;
  [name: string]: any;
}

interface FirestoreSchema {
  tasks: FirestoreReducer.Entity<Tasks>;
  [name: string]: any;
}

interface CombinedReducersState {
  todos: TodosState;
  currentUser: CurrentUser;
  notifications: NotificationState;
  firebase: FirebaseReducer.Reducer<{}, FirebaseSchema>;
  firestore: FirestoreReducer.Reducer<FirestoreSchema>;
}

const rootReducer = combineReducers<CombinedReducersState>({
  todos: TodosReducer,
  currentUser: UserReducer,
  notifications: NotificationsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
