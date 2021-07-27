import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { CurrentTask } from '../components/CurrentTask';
import { IncomingTask } from '../components/IncomingTask';
import { RootState } from '../redux/MainStore';
import { useSelector } from 'react-redux';
import i18n from 'i18n-js';
import { set } from 'date-fns';
import { InteractionManager } from 'react-native';

export default function CurrentTasksScreen() {
  const { todos } = useSelector((state: RootState) => state.todos);
  const currentDate = new Date();
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  const getCurrentTasks = () => {
    return todos.filter((task) => {
      const taskDateWithTime = set(task.date, {
        hours: task.time.hours,
        minutes: task.time.minutes
      })
      return !task.completed && taskDateWithTime <= currentDate
    }).sort((previousTask, currentTask) => {
      const previousTaskDateWithTime = set(previousTask.date, {
        hours: previousTask.time.hours,
        minutes: previousTask.time.minutes
      })
      const currentTaskDateWithTime = set(currentTask.date, {
        hours: currentTask.time.hours,
        minutes: currentTask.time.minutes
      })
      return currentTaskDateWithTime.getTime() - previousTaskDateWithTime.getTime()
    })
  }

  const getIncomingTasks = () => {
    return todos.filter((task) => {
      const taskDateWithTime = set(task.date, {
        hours: task.time.hours,
        minutes: task.time.minutes
      })
      return !task.completed && taskDateWithTime > currentDate}).sort((previousTask, currentTask) => {
        const previousTaskDateWithTime = set(previousTask.date, {
          hours: previousTask.time.hours,
          minutes: previousTask.time.minutes
        })
        const currentTaskDateWithTime = set(currentTask.date, {
          hours: currentTask.time.hours,
          minutes: currentTask.time.minutes
        })
        return previousTaskDateWithTime.getTime() - currentTaskDateWithTime.getTime()
      })
  }

  React.useEffect(() => {
   setTimeout(() => {
    forceUpdate()
   }, 60000)
  })

  return (
    <ScrollView>
      <Text style={styles.title}>{i18n.t('currentTasksScreen.currentTasksTitle')}</Text>
      <View>
        {getCurrentTasks().map(task => <CurrentTask key={task.id} task={task} />)}
      </View>
      <Text style={styles.title}>{i18n.t('currentTasksScreen.incomingTasksTitle')}</Text>
      <View>
      {getIncomingTasks().map(task => <IncomingTask key={task.id} task={task} />)}
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
