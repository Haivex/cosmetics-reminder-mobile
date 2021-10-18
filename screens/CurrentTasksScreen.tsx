import i18n from 'i18n-js';
import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {CurrentTask} from '../components/CurrentTask';
import {IncomingTask} from '../components/IncomingTask';
import {RootState} from '../redux/RootReducer';

export default function CurrentTasksScreen() {
  const {todos} = useSelector((state: RootState) => state.todos);
  const currentTimestamp = Date.now();
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  const getCurrentTasks = () => {
    return todos
      .filter(task => {
        return !task.completed && task.timestamp <= currentTimestamp;
      })
      .sort((previousTask, currentTask) => {
        return currentTask.timestamp - previousTask.timestamp;
      });
  };

  const getIncomingTasks = () => {
    return todos
      .filter(task => {
        return !task.completed && task.timestamp > currentTimestamp;
      })
      .sort((previousTask, currentTask) => {
        return previousTask.timestamp - currentTask.timestamp;
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => forceUpdate()} />
      }>
      <Text style={styles.title}>
        {i18n.t('currentTasksScreen.currentTasksTitle')}
      </Text>
      <View>
        {getCurrentTasks().map(task => (
          <CurrentTask key={task.id} task={task} />
        ))}
      </View>
      <Text style={styles.title}>
        {i18n.t('currentTasksScreen.incomingTasksTitle')}
      </Text>
      <View>
        {getIncomingTasks().map(task => (
          <IncomingTask key={task.id} task={task} />
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
