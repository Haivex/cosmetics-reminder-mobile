import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {CyclicInterval} from '../components/CyclicTaskInputs';

export interface TaskDocument {
  date: FirebaseFirestoreTypes.Timestamp;
  title: string;
  completed: boolean;
  cyclicInterval: CyclicInterval | undefined;
}

export interface TaskDocumentWithId extends TaskDocument {
  id: string;
}
