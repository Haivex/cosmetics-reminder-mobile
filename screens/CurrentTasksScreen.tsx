import * as React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {List, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import NoTasksCard from '../components/NoTasksCard';
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

  const renderCurrentTasks = (): JSX.Element | JSX.Element[] => {
    if (!isLoaded(currentTasks)) {
      return <Text>Loading...</Text>;
    }
    if (isEmpty(currentTasks)) {
      return <NoTasksCard additionalText={translate('noTask.goodWork')} />;
    }
    return currentTasks.map(task => (
      <Task
        icon="alarm-check"
        key={task.id}
        task={task as TaskType}
        menuActions={currentTaskActions}
      />
    ));
  };

  const renderIncomingTasks = (): JSX.Element | JSX.Element[] => {
    if (!isLoaded(incomingTasks)) {
      return <Text>Loading...</Text>;
    }
    if (isEmpty(incomingTasks)) {
      return (
        <NoTasksCard additionalText={translate('noTask.createProposition')} />
      );
    }
    return incomingTasks.map(task => (
      <Task
        icon="alarm"
        key={task.id}
        task={task as TaskType}
        menuActions={incomingTaskActions}
      />
    ));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => forceUpdate()} />
      }>
      <List.Section>
        <List.Subheader>
          {translate('currentTasksScreen.currentTasksTitle')}
        </List.Subheader>
        {renderCurrentTasks()}
      </List.Section>
      <List.Section>
        <List.Subheader>
          {translate('currentTasksScreen.incomingTasksTitle')}
        </List.Subheader>
        {renderIncomingTasks()}
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
