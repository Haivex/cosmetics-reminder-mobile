import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { Task } from '../redux/TodosReducer';
import { formatRelative, set } from 'date-fns'
import { pl } from 'date-fns/locale'

type DoneTaskProps = {
    task: Task
}

export const DoneTask = ({task}: DoneTaskProps ) => {
    return (
        <Card.Title
        title={task.title}
        subtitle={`${formatRelative(set(task.date, {
            ...task.time
        }), new Date(), {locale: pl})}`}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    )
}