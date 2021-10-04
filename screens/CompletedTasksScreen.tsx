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
        return currentTask.date.getTime() - previousTask.date.getTime();
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
