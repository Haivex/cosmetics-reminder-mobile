import * as React from 'react';
import {formatRelative} from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import {localesMap} from '../constants/dateLocales';
import i18n from 'i18n-js';
import {Task as TaskData} from '../types';
import TaskMenu, {SingleAction} from './TaskMenu';
import {enUS} from 'date-fns/locale';
import {View} from 'react-native';
import {Avatar, Card} from 'react-native-paper';

type TaskProps = {
  task: TaskData;
  menuActions: SingleAction[];
};

export const Task = ({task, menuActions}: TaskProps) => {
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
    <View>
      <Card.Title
        title={task.title}
        subtitle={formattedTime}
        left={props => <Avatar.Icon {...props} icon="folder" />}
        right={props => (
          <TaskMenu actions={menuActions} task={task} {...props} />
        )}
      />
    </View>
  );
};
