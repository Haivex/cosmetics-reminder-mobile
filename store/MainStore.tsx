import * as React from 'react';
import { TaskData, Time } from '../screens/TabOneScreen';

export type Task = {
  index: number;
  title: string;
  time: Time;
  date: Date;
  completed: boolean;
};

export type AppState = {
  todos: Task[];
  add(task: TaskData): void;
  markCompleted(task: Task): void;
};

export const globalState: AppState = {
  todos: [
    {
      index: 0,
      title: 'Learn React',
      time: { hours: 12, minutes: 50 },
      date: new Date(),
      completed: true,
    },
    {
      index: 1,
      title: 'Learn Redux',
      time: { hours: 13, minutes: 50 },
      date: new Date(2022, 7, 20),
      completed: false,
    },
    {
      index: 2,
      title: 'Build something fun!',
      time: { hours: 14, minutes: 50 },
      date: new Date(2021, 5, 13),
      completed: false,
    },
  ],
  add(taskData: TaskData) {
    this.todos.push({
        index: this.todos[this.todos.length - 1].index + 1,
        title: taskData.title,
        date: taskData.date,
        time: taskData.time,
        completed: false,
    })
  },
  markCompleted(task: Task) {
    task.completed = true;
  }
};

const TodosContext = React.createContext<AppState>(globalState);
export default TodosContext;
