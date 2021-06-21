import * as React from 'react';
import { ScrollView } from 'react-native';
import { RootState } from '../redux/MainStore';
import { useSelector } from 'react-redux';
import { DoneTask } from '../components/DoneTask';

export default function TabThreeScreen() {
    const { todos } = useSelector((state: RootState) => state.todos);

    const getDoneTasks = () => {
        return todos.filter((task) => task.completed)
      }

    return (
        <ScrollView>
            {getDoneTasks().map(task => <DoneTask key={task.index} task={task} />)}
        </ScrollView>
    )
}

