import {combineReducers} from '@reduxjs/toolkit';
import NotificationsReducer, {NotificationState} from './NotificationsReducer';
import TodosReducer, {TodosState} from './TodosReducer';
import UserReducer, {CurrentUser} from './UserReducer';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {FirestoreReducer, firestoreReducer} from 'redux-firestore';

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
  date: Date;
  userUID: string;
  cyclicInterval?: CyclicInterval;
}

interface Schema {
  tasks: Tasks;
}

interface CombinedReducersState {
  todos: TodosState;
  currentUser: CurrentUser;
  notifications: NotificationState;
  firebase: FirebaseReducer.Reducer<{}, Schema>;
  firestore: FirestoreReducer.Reducer;
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
