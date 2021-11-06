import * as React from 'react';
import {formatRelative} from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import {localesMap} from '../constants/dateLocales';
import i18n from 'i18n-js';
import {Task as TaskData} from '../types';
import TaskMenu, {SingleAction} from './TaskMenu';
import {enUS} from 'date-fns/locale';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type TaskProps = {
  icon: string;
  task: TaskData;
  menuActions: SingleAction[];
};

export const Task = ({icon, task, menuActions}: TaskProps) => {
  const formattedTime = formatRelative(
    new firestore.Timestamp(
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
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
