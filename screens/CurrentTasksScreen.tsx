import {set as updateDate} from 'date-fns';
import i18n from 'i18n-js';
import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {CurrentTask} from '../components/CurrentTask';
import {IncomingTask} from '../components/IncomingTask';
import {RootState} from '../redux/MainStore';

export default function CurrentTasksScreen() {
  const {todos} = useSelector((state: RootState) => state.todos);
  const currentDate = new Date();
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  const getCurrentTasks = () => {
    return todos
      .filter(task => {
        const taskDateWithTime = updateDate(task.date, {
          hours: task.time.hours,
          minutes: task.time.minutes,
        });
        return !task.completed && taskDateWithTime <= currentDate;
      })
      .sort((previousTask, currentTask) => {
        const previousTaskDateWithTime = updateDate(previousTask.date, {
          hours: previousTask.time.hours,
          minutes: previousTask.time.minutes,
        });
        const currentTaskDateWithTime = updateDate(currentTask.date, {
          hours: currentTask.time.hours,
          minutes: currentTask.time.minutes,
        });
        return (
          currentTaskDateWithTime.getTime() - previousTaskDateWithTime.getTime()
        );
      });
  };

  const getIncomingTasks = () => {
    return todos
      .filter(task => {
        const taskDateWithTime = updateDate(task.date, {
          hours: task.time.hours,
          minutes: task.time.minutes,
        });
        return !task.completed && taskDateWithTime > currentDate;
      })
      .sort((previousTask, currentTask) => {
        const previousTaskDateWithTime = updateDate(previousTask.date, {
          hours: previousTask.time.hours,
          minutes: previousTask.time.minutes,
        });
        const currentTaskDateWithTime = updateDate(currentTask.date, {
          hours: currentTask.time.hours,
          minutes: currentTask.time.minutes,
        });
        return (
          previousTaskDateWithTime.getTime() - currentTaskDateWithTime.getTime()
        );
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
