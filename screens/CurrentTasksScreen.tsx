import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {Task} from '../components/Task';
import currentTaskActions from '../components/taskMenuActions/currentTaskActions';
import incomingTaskActions from '../components/taskMenuActions/incomingTaskActions';
import {RootState} from '../redux/RootReducer';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';

export default function CurrentTasksScreen() {
  const currentDate = new Date();
  const user = useSelector((state: RootState) => state.currentUser.data);
  useFirestoreConnect([
    {
      collection: 'tasks',
      where: [
        ['userUID', '==', user?.uid],
        ['completed', '==', false],
        ['date', '<=', currentDate],
      ],
      orderBy: ['date', 'asc'],
      storeAs: 'currentTasks',
    },
    {
      collection: 'tasks',
      where: [
        ['userUID', '==', user?.uid],
        ['completed', '==', false],
        ['date', '>', currentDate],
      ],
      orderBy: ['date', 'asc'],
      storeAs: 'incomingTasks',
    },
  ]);
  const {currentTasks, incomingTasks} = useSelector(
    (state: RootState) => state.firestore.ordered,
  );
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => forceUpdate()} />
      }>
      <List.Section>
        <List.Subheader>
          {translate('currentTasksScreen.currentTasksTitle')}
        </List.Subheader>
        {currentTasks &&
          currentTasks.map(task => (
            <Task
              key={task.id}
              task={task as TaskType}
              menuActions={currentTaskActions}
            />
          ))}
      </List.Section>
      <List.Section>
        <List.Subheader>
          {translate('currentTasksScreen.incomingTasksTitle')}
        </List.Subheader>
        {incomingTasks &&
          incomingTasks.map(task => (
            <Task
              key={task.id}
              task={task as TaskType}
              menuActions={incomingTaskActions}
            />
          ))}
      </List.Section>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
