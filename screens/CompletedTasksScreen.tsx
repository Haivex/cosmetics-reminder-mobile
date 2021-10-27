import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {Task} from '../components/Task';
import completedTaskActions from '../components/taskMenuActions/completedTaskActions';
import {RootState} from '../redux/RootReducer';
import {Task as TaskType} from '../types';

export default function CompletedTasksScreen() {
  const user = useSelector((state: RootState) => state.currentUser.data);
  useFirestoreConnect([
    {
      collection: 'tasks',
      where: [
        ['userUID', '==', user?.uid],
        ['completed', '==', true],
      ],
      orderBy: ['date', 'desc'],
      storeAs: 'doneTasks',
    },
  ]);
  const {doneTasks: todos} = useSelector(
    (state: RootState) => state.firestore.ordered,
  );

  return (
    <ScrollView>
      <List.Section>
        {todos &&
          todos.map(task => (
            <Task
              key={task.id}
              task={task as TaskType}
              menuActions={completedTaskActions}
            />
          ))}
      </List.Section>
    </ScrollView>
  );
}
