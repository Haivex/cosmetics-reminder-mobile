import * as React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {RootState} from '../redux/RootReducer';
import firestore from '@react-native-firebase/firestore';
import {Task as TaskType} from '../types';
import {Task} from '../components/Task';
import completedTaskActions from '../components/taskMenuActions/completedTaskActions';

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
        getDoneTasks().map(task => (
          <Task
            key={task.id}
            task={task as TaskType}
            menuActions={completedTaskActions}
          />
        ))}
    </ScrollView>
  );
}
