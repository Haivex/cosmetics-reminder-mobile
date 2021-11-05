import * as React from 'react';
import {ScrollView} from 'react-native';
import {List, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useFirestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
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

  const renderDoneTasks = () => {
    if (!isLoaded(todos)) {
      return <Text>Loading...</Text>;
    }
    if (isEmpty(todos)) {
      return <Text>Empty</Text>;
    }
    return todos.map(task => (
      <Task
        icon="checkbox-marked-circle"
        key={task.id}
        task={task as TaskType}
        menuActions={completedTaskActions}
      />
    ));
  };

  return (
    <ScrollView>
      <List.Section>{renderDoneTasks()}</List.Section>
    </ScrollView>
  );
}
