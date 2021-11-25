import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/tasks/cards/LoadingTasksCard';
import NoTasksCard from '../components/tasks/cards/NoTasksCard';
import completedTaskActions from '../components/taskMenu/actions/completedTaskActions';
import {
  deleteAction,
  restoreAction,
} from '../components/taskMenu/actions/taskActions';
import TasksSwipeList from '../components/tasks/TasksSwipeList';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectCurrentUser, selectTasks} from '../redux/selectors';
import {translate} from '../translation/config';
import {Task as TaskType} from '../types';
import Search from '../components/search/Search';
import searchTasks from '../shared/searchTasks';

export default function CompletedTasksScreen() {
  const state = useTrackedSelector();
  const user = selectCurrentUser(state);
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
  const [query, setQuery] = React.useState('');

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
        tasks={searchTasks(todos as TaskType[], query)}
        taskMenuActions={completedTaskActions}
        leftActionData={{
          actionButtonColor: 'blue',
          actionIcon: 'restore',
          actionCallback: restoreAction.callback,
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
      <List.Section>{renderDoneTasks()}</List.Section>
    </List.Section>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
