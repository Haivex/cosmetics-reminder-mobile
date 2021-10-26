import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
//import {CurrentTask} from '../components/CurrentTask';
import {IncomingTask} from '../components/IncomingTask';
import {Task} from '../components/Task';
import currentTaskActions from '../components/taskMenuActions/currentTaskActions';
import {RootState} from '../redux/RootReducer';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';

export default function CurrentTasksScreen() {
  const user = useSelector((state: RootState) => state.currentUser.data);
  useFirestoreConnect([
    {
      collection: 'tasks',
      where: ['userUID', '==', user?.uid],
    },
  ]);
  const {tasks: todos} = useSelector(
    (state: RootState) => state.firestore.ordered,
  );
  const currentTimestamp = Date.now();
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const getCurrentTasks = () => {
    return todos
      .filter(task => {
        return (
          !task.completed &&
          new firestore.Timestamp(
            task.date.seconds,
            task.date.nanoseconds,
          ).toMillis() <= currentTimestamp
        );
      })
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

  const getIncomingTasks = () => {
    return todos
      .filter(task => {
        return (
          !task.completed &&
          new firestore.Timestamp(
            task.date.seconds,
            task.date.nanoseconds,
          ).toMillis() > currentTimestamp
        );
      })
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => forceUpdate()} />
      }>
      <Text style={styles.title}>
        {translate('currentTasksScreen.currentTasksTitle')}
      </Text>
      <View>
        {todos &&
          getCurrentTasks().map(task => (
            <Task
              key={task.id}
              task={task as TaskType}
              menuActions={currentTaskActions}
            />
          ))}
      </View>
      <Text style={styles.title}>
        {translate('currentTasksScreen.incomingTasksTitle')}
      </Text>
      <View>
        {todos &&
          getIncomingTasks().map(task => (
            <IncomingTask key={task.id} task={task as TaskType} />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
