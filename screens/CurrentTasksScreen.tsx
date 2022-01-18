import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/tasks/cards/LoadingTasksCard';
import NoTasksCard from '../components/tasks/cards/NoTasksCard';
import currentTaskActions from '../components/taskMenu/actions/currentTaskActions';
import incomingTaskActions from '../components/taskMenu/actions/incomingTaskActions';
import {
  completeAction,
  deleteAction,
} from '../components/taskMenu/actions/taskActions';
import TasksSwipeList from '../components/tasks/TasksSwipeList';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectCurrentUser, selectTasks} from '../redux/selectors';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';
import Search from '../components/search/Search';
import searchTasks from '../shared/searchTasks';

export default function CurrentTasksScreen() {
  const state = useTrackedSelector();
  const currentDate = new Date();
  const user = selectCurrentUser(state);
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
  const {currentTasks, incomingTasks} = selectTasks(state);
  const [query, setQuery] = React.useState('');

  const renderCurrentTasks = (): JSX.Element | JSX.Element[] => {
    if (!isLoaded(currentTasks)) {
      return <LoadingTasksCard />;
    }
    if (isEmpty(currentTasks)) {
      return <NoTasksCard additionalText={translate('noTask.goodWork')} />;
    }
    return (
      <TasksSwipeList
        taskIcon="clock-check"
        tasks={searchTasks(currentTasks as TaskType[], query)}
        taskMenuActions={currentTaskActions}
        leftActionData={{
          actionButtonColor: 'green',
          actionIcon: 'check',
          actionCallback: completeAction.callback,
        }}
        rightActionData={{
          actionButtonColor: 'red',
          actionIcon: 'trash-can-outline',
          actionCallback: task => deleteAction.callback(task),
        }}
      />
    );
  };

  const renderIncomingTasks = (): JSX.Element | JSX.Element[] => {
    if (!isLoaded(incomingTasks)) {
      return <LoadingTasksCard />;
    }
    if (isEmpty(incomingTasks)) {
      return (
        <NoTasksCard additionalText={translate('noTask.createProposition')} />
      );
    }
    return (
      <TasksSwipeList
        taskIcon="clock"
        tasks={searchTasks(incomingTasks as TaskType[], query)}
        taskMenuActions={incomingTaskActions}
        leftActionData={{
          actionButtonColor: 'green',
          actionIcon: 'check',
          actionCallback: completeAction.callback,
        }}
        rightActionData={{
          actionButtonColor: 'red',
          actionIcon: 'trash-can-outline',
          actionCallback: task => deleteAction.callback(task),
        }}
      />
    );
  };

  return (
    <List.Section style={styles.container}>
      <Search
        onChangeText={React.useCallback(text => {
          setQuery(text);
        }, [])}
      />
      <List.Section>
        <List.Subheader style={styles.title}>
          {translate('currentTasksScreen.currentTasksTitle')}
        </List.Subheader>
        {renderCurrentTasks()}
      </List.Section>
      <List.Section>
        <List.Subheader style={styles.title}>
          {translate('currentTasksScreen.incomingTasksTitle')}
        </List.Subheader>
        {renderIncomingTasks()}
      </List.Section>
    </List.Section>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
