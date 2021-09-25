import {set as updateDate} from 'date-fns';
import * as React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {DoneTask} from '../components/DoneTask';
import {RootState} from '../redux/MainStore';

export default function CompletedTasksScreen() {
  const {todos} = useSelector((state: RootState) => state.todos);

  const getDoneTasks = () => {
    return todos
      .filter(task => task.completed)
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

  return (
    <ScrollView>
      {getDoneTasks().map(task => (
        <DoneTask key={task.id} task={task} />
      ))}
    </ScrollView>
  );
}
