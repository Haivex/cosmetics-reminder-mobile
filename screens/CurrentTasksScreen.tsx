import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, List} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {isEmpty, isLoaded, useFirestoreConnect} from 'react-redux-firebase';
import LoadingTasksCard from '../components/LoadingTasksCard';
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
      return <LoadingTasksCard />;
    }
    if (isEmpty(currentTasks)) {
      return <NoTasksCard additionalText={translate('noTask.goodWork')} />;
    }
    return (
      <SwipeListView
        data={currentTasks.map(task => ({key: task.id, task: task}))}
        renderItem={data => (
          <Task
            icon="alarm-check"
            key={data.item.task.id}
            task={data.item.task as TaskType}
            menuActions={currentTaskActions}
          />
        )}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={styles.leftSwipeButton}>
              <MaterialIcon size={25} color="white" name="check" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightSwipeButton}>
              <MaterialIcon size={25} color="white" name="trash-can-outline" />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
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
      <SwipeListView
        data={incomingTasks.map(task => ({key: task.id, task: task}))}
        renderItem={data => (
          <Task
            icon="alarm"
            key={data.item.task.id}
            task={data.item.task as TaskType}
            menuActions={incomingTaskActions}
          />
        )}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <IconButton icon="check" style={styles.leftSwipeButton} />
            <IconButton
              icon="trash-can-outline"
              style={styles.rightSwipeButton}
            />
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
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
