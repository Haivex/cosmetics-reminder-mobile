import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {combineReducers} from '@reduxjs/toolkit';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer, FirestoreReducer} from 'redux-firestore';
import NotificationsReducer, {NotificationState} from './NotificationsReducer';
import UserReducer, {CurrentUser} from './UserReducer';
import {useSelector} from 'react-redux';
import {createTrackedSelector} from 'react-tracked';
import ThemeReducer, { ThemeState } from './ThemeReducer';

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
  doneTasks: Tasks;
  incomingTasks: FirestoreReducer.Entity<Tasks>;
  currentTasks: FirestoreReducer.Entity<Tasks>;
  [name: string]: any;
}

interface FirestoreSchema {
  tasks: FirestoreReducer.Entity<Tasks>;
  doneTasks: FirestoreReducer.Entity<Tasks>;
  incomingTasks: FirestoreReducer.Entity<Tasks>;
  currentTasks: FirestoreReducer.Entity<Tasks>;
  [name: string]: any;
}

interface CombinedReducersState {
  currentUser: CurrentUser;
  notifications: NotificationState;
  firebase: FirebaseReducer.Reducer<{}, FirebaseSchema>;
  firestore: FirestoreReducer.Reducer<FirestoreSchema>;
  themes: ThemeState;
}

const rootReducer = combineReducers<CombinedReducersState>({
  currentUser: UserReducer,
  notifications: NotificationsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  themes: ThemeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const useTrackedSelector = createTrackedSelector<RootState>(useSelector);
