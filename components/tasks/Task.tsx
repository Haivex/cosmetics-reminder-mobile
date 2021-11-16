import * as React from 'react';
import {formatRelative} from 'date-fns';
import {firebaseApp} from '../../App';
import {localesMap} from '../../constants/dateLocales';
import i18n from 'i18n-js';
import {Task as TaskData} from '../../types';
import TaskMenu, {SingleAction} from '../taskMenu/TaskMenu';
import {enUS} from 'date-fns/locale';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type TaskProps = {
  icon: string;
  task: TaskData;
  menuActions: SingleAction[];
};

export const Task = React.memo(({icon, task, menuActions}: TaskProps) => {
  const formattedTime = formatRelative(
    new firebaseApp.firestore.Timestamp(
      task.date.seconds,
      task.date.nanoseconds,
    ).toMillis(),
    new Date(),
    {
      locale: localesMap.get(i18n.currentLocale()) || enUS,
    },
  );

  return (
    <List.Item
      style={styles.item}
      title={task.title}
      description={formattedTime}
      left={props => <List.Icon {...props} icon={icon} />}
      right={props => <TaskMenu actions={menuActions} task={task} {...props} />}
    />
  );
});

const styles = StyleSheet.create({
  item: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#fff',
  },
});
