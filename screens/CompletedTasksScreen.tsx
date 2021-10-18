import * as React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {DoneTask} from '../components/DoneTask';
import {RootState} from '../redux/RootReducer';
import firestore from '@react-native-firebase/firestore';

export default function CompletedTasksScreen() {
  const user = useSelector((state: RootState) => state.currentUser.data);
  useFirestoreConnect([
    {
      collection: 'tasks',
      where: [
        ['userUID', '==', user?.uid],
        ['completed', '==', true],
      ],
      storeAs: 'doneTasks',
    },
  ]);
  const {doneTasks: todos} = useSelector(
    (state: RootState) => state.firestore.ordered,
  );

  const getDoneTasks = () => {
    return todos
      .filter(task => task.completed)
      .sort((previousTask, currentTask) => {
        return (
          new firestore.Timestamp(
            currentTask.date.seconds,
            currentTask.date.nanoseconds,
          ).toMillis() -
          new firestore.Timestamp(
            previousTask.date.seconds,
            previousTask.date.nanoseconds,
          ).toMillis()
        );
      });
  };

  return (
    <ScrollView>
      {todos &&
        getDoneTasks().map(task => <DoneTask key={task.id} task={task} />)}
    </ScrollView>
  );
}
