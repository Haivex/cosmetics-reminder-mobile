import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector,shallowEqual} from 'react-redux';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/LoadingTasksCard';
import NoTasksCard from '../components/NoTasksCard';
import currentTaskActions from '../components/taskMenuActions/currentTaskActions';
import incomingTaskActions from '../components/taskMenuActions/incomingTaskActions';
import TasksSwipeList from '../components/TasksSwipeList';
import {RootState} from '../redux/RootReducer';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';
import {
  completeAction,
  deleteAction,
} from '../components/taskMenuActions/taskActions';
import {navigationRef} from '../navigation';

export default function CurrentTasksScreen() {
  const navigation = navigationRef;
  const notificationsState = useSelector(
    (state: RootState) => state.notifications,
    shallowEqual,
  );
  const appState = {
    navigation,
    globalState: {notifications: notificationsState},
  };
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  leftSwipeButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 75,
    top: 0,
    left: 0,
    bottom: 0,
    margin: 0,
  },
  rightSwipeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 75,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 0,
  },
});
