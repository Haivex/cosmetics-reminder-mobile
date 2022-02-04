import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {combineReducers} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {createTrackedSelector} from 'react-tracked';
import {firestoreReducer, FirestoreReducer} from 'redux-firestore';
import LanguageReducer, {Language} from './LanguageReducer';
import NotificationsReducer, {NotificationState} from './NotificationsReducer';
import ThemeReducer, {ThemeState} from './ThemeReducer';
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
  languages: Language;
}

const rootReducer = combineReducers<CombinedReducersState>({
  currentUser: UserReducer,
  notifications: NotificationsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  themes: ThemeReducer,
  languages: LanguageReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const useTrackedSelector = createTrackedSelector<RootState>(useSelector);
