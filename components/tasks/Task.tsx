import {formatRelative} from 'date-fns';
import {enUS} from 'date-fns/locale';
import i18n from 'i18n-js';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import {firebaseApp} from '../../App';
import {localesMap} from '../../constants/dateLocales';
import {Task as TaskType} from '../../types';
import TaskMenu, {SingleAction} from '../taskMenu/TaskMenu';

type TaskProps = {
  icon: string;
  task: TaskType;
  menuActions: SingleAction[];
};

export const Task = React.memo(({icon, task, menuActions}: TaskProps) => {
  const theme = useTheme();
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

  const background = StyleSheet.create({
    color: {
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <List.Item
      style={[styles.item, background.color]}
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
  },
});
