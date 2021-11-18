import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {CyclicInterval} from '../components/taskForm/inputs/CyclicTaskInputs';

export interface TaskDocument {
  date: FirebaseFirestoreTypes.Timestamp;
  title: string;
  completed: boolean;
  cyclicInterval?: CyclicInterval;
}

export interface TaskDocumentWithId extends TaskDocument {
  id: string;
}
