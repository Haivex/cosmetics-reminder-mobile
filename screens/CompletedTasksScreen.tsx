import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector, shallowEqual} from 'react-redux';
import {useFirestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import LoadingTasksCard from '../components/LoadingTasksCard';
import NoTasksCard from '../components/NoTasksCard';
import completedTaskActions from '../components/taskMenuActions/completedTaskActions';
import {
  deleteAction,
  restoreAction,
} from '../components/taskMenuActions/taskActions';
import TasksSwipeList from '../components/TasksSwipeList';
import {navigationRef} from '../navigation';
import {RootState} from '../redux/RootReducer';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';

export default function CompletedTasksScreen() {
  const user = useSelector((state: RootState) => state.currentUser.data);
  const navigation = navigationRef;
  const notificationsState = useSelector(
    (state: RootState) => state.notifications,
    shallowEqual,
  );
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
  const {doneTasks: todos} = useSelector(
    (state: RootState) => state.firestore.ordered,
  );

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
    <ScrollView>
      <List.Section>{renderDoneTasks()}</List.Section>
    </ScrollView>
  );
}
