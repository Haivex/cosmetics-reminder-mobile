import * as React from 'react';
import { useReducer } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import appReducer, { initialState } from '../store/MainStore';

export default function TabTwoScreen() {
  const [state] = useReducer(appReducer, initialState);
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
        {getCurrentTasks().map(task => <Text>{task.title}</Text>)}
      </View>
      <Text style={styles.title}>Nadchodzące zadania</Text>
      <View>
      {getIncomingTasks().map(task => <Text>{task.title}</Text>)}
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
