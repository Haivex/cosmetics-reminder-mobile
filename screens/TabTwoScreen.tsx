import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { CurrentTask } from '../components/CurrentTask';
import { IncomingTask } from '../components/IncomingTask';
import TodosContext, { AppState } from '../store/MainStore';

export default function TabTwoScreen() {
  const state = React.useContext<AppState>(TodosContext);
  const currentDate = new Date();

  const getCurrentTasks = () => {
    return state.todos.filter((task) => !task.completed && task.date <= currentDate)
  }

  const getIncomingTasks = () => {
    return state.todos.filter((task) => !task.completed && task.date > currentDate)
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Aktualne zadania</Text>
      <View>
        {getCurrentTasks().map(task => <CurrentTask key={task.index} task={task} />)}
      </View>
      <Text style={styles.title}>Nadchodzące zadania</Text>
      <View>
      {getIncomingTasks().map(task => <IncomingTask key={task.index} task={task} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
