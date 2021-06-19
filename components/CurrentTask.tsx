import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View } from 'react-native'
import { Task } from '../store/MainStore'

type CurrentTaskProps = {
    task: Task
}

export const CurrentTask = ({task}: CurrentTaskProps ) => {
    return (
        <Card.Title
        title={task.title}
        subtitle={`${task.date}, ${task.time}`}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    )
}
