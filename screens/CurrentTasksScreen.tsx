import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/LoadingTasksCard';
import NoTasksCard from '../components/NoTasksCard';
import currentTaskActions from '../components/taskMenuActions/currentTaskActions';
import incomingTaskActions from '../components/taskMenuActions/incomingTaskActions';
import {
  completeAction,
  deleteAction,
} from '../components/taskMenuActions/taskActions';
import TasksSwipeList from '../components/TasksSwipeList';
import {navigationRef} from '../navigation';
import {useTrackedSelector} from '../redux/RootReducer';
import {
  selectCurrentUser,
  selectNotifications,
  selectTasks,
} from '../redux/selectors';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';

export default function CurrentTasksScreen() {
  const state = useTrackedSelector();
  const notificationsState = selectNotifications(state);
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
  const navigation = navigationRef;
  const appState = {
    navigation,
    globalState: {notifications: notificationsState},
  };

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
        tasks={currentTasks as TaskType[]}
        taskMenuActions={currentTaskActions}
        leftActionData={{
          actionButtonColor: 'green',
          actionIcon: 'check',
          actionCallback: completeAction.callback,
        }}
        rightActionData={{
          actionButtonColor: 'red',
          actionIcon: 'trash-can-outline',
          actionCallback: task => deleteAction.callback(task, appState),
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
        tasks={incomingTasks as TaskType[]}
        taskMenuActions={incomingTaskActions}
        leftActionData={{
          actionButtonColor: 'green',
          actionIcon: 'check',
          actionCallback: completeAction.callback,
        }}
        rightActionData={{
          actionButtonColor: 'red',
          actionIcon: 'trash-can-outline',
          actionCallback: task => deleteAction.callback(task, appState),
        }}
      />
    );
  };

  return (
    <List.Section style={styles.container}>
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
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
