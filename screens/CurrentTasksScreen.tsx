import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
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
      <Text style={styles.title}>
        {translate('currentTasksScreen.currentTasksTitle')}
      </Text>
      <View>
        {currentTasks &&
          currentTasks.map(task => (
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
        {incomingTasks &&
          incomingTasks.map(task => (
            <Task
              key={task.id}
              task={task as TaskType}
              menuActions={incomingTaskActions}
            />
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
