import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Task as TaskType} from '../../types';
import {Task} from './Task';
import {SingleAction} from '../taskMenu/TaskMenu';

interface ActionData {
  actionIcon: string;
  actionCallback: (task: TaskType) => unknown;
  actionButtonColor: string;
}

interface RowItemProps<T> {
  data: ListRenderItemInfo<T>;
  rowMap: RowMap<T>;
  leftActionActivated?: boolean;
  rightActionActivated?: boolean;
  leftActionState?: boolean;
  rightActionState?: boolean;
}

interface SwipeListData {
  key: string;
  task: TaskType;
}

interface TasksSwipeListProps {
  tasks: TaskType[];
  taskIcon: string;
  taskMenuActions: SingleAction[];
  leftActionData: ActionData;
  rightActionData: ActionData;
}

interface HiddenItemProps extends RowItemProps<SwipeListData> {
  leftActionData: ActionData;
  rightActionData: ActionData;
}

const HiddenItem = (props: HiddenItemProps) => {
  const {
    data,
    leftActionData: leftActionDataProp,
    rightActionData: rightActionDataProp,
    rowMap,
  } = props;
  return (
    <View style={[styles.rowBack]}>
      <TouchableOpacity
        onPress={() => {
          rowMap[data.item.key].closeRow();
          leftActionDataProp.actionCallback(data.item.task);
        }}
        style={[
          styles.leftSwipeButton,
          {
            backgroundColor: leftActionDataProp.actionButtonColor,
          },
        ]}>
        <MaterialIcon
          size={25}
          color="white"
          name={leftActionDataProp.actionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          rowMap[data.item.key].closeRow();
          rightActionDataProp.actionCallback(data.item.task);
        }}
        style={[
          styles.rightSwipeButton,
          {
            backgroundColor: rightActionDataProp.actionButtonColor,
          },
        ]}>
        <MaterialIcon
          size={25}
          color="white"
          name={rightActionDataProp.actionIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const TasksSwipeList = ({
  tasks,
  taskMenuActions,
  leftActionData,
  rightActionData,
  taskIcon,
}: TasksSwipeListProps) => {
  const renderHiddenItem = (
    data: ListRenderItemInfo<SwipeListData>,
    rowMap: RowMap<SwipeListData>,
  ) => {
    return (
      <HiddenItem
        leftActionData={leftActionData}
        rightActionData={rightActionData}
        data={data}
        rowMap={rowMap}
      />
    );
  };

  return (
    <SwipeListView
      closeOnRowPress={true}
      closeOnScroll={true}
      data={tasks.map(task => ({key: task.id, task: task}))}
      renderItem={data => (
        <Task
          icon={taskIcon}
          key={data.item.task.id}
          task={data.item.task}
          menuActions={taskMenuActions}
        />
      )}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      stopLeftSwipe={75}
      stopRightSwipe={-75}
    />
  );
};

const styles = StyleSheet.create({
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

export default TasksSwipeList;
