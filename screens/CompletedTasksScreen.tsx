import * as React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/LoadingTasksCard';
import NoTasksCard from '../components/NoTasksCard';
import completedTaskActions from '../components/taskMenuActions/completedTaskActions';
import {
  deleteAction,
  restoreAction,
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

export default function CompletedTasksScreen() {
  const state = useTrackedSelector();
  const user = selectCurrentUser(state);
  const navigation = navigationRef;
  const notificationsState = selectNotifications(state);
  const appState = {
    navigation,
    globalState: {notifications: notificationsState},
  };
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
  const {doneTasks: todos} = selectTasks(state);

  const renderDoneTasks = () => {
    if (!isLoaded(todos)) {
      return <LoadingTasksCard />;
    }
    if (isEmpty(todos)) {
      return (
        <NoTasksCard additionalText={translate('noTask.finishedTaskInfo')} />
      );
    }
    return (
      <TasksSwipeList
        taskIcon="checkbox-marked-circle"
        tasks={todos as TaskType[]}
        taskMenuActions={completedTaskActions}
        leftActionData={{
          actionButtonColor: 'blue',
          actionIcon: 'restore',
          actionCallback: restoreAction.callback,
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
    <View>
      <List.Section>{renderDoneTasks()}</List.Section>
    </View>
  );
}
