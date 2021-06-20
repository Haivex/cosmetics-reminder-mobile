import * as React from 'react';
import { TaskData, Time } from '../screens/TabOneScreen';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Task = {
  index: number;
  title: string;
  time: Time;
  date: Date;
  completed: boolean;
};

export type AppState = {
  todos: Task[];
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
};

const todosSlice = createSlice({
  name: "todos",
  initialState: globalState,
  reducers: {
    addTodo(state, action: PayloadAction<TaskData>) {
      state.todos = [...state.todos, {
        index: state.todos[state.todos.length - 1].index + 1,
        title: action.payload.title,
        date: new Date(action.payload.date as Date),
        time: action.payload.time,
        completed: false,
    }]
    },
    markTodoCompleted(state, action: PayloadAction<Task>) {
      action.payload.completed = true;
    }
  }
})

export const { addTodo, markTodoCompleted} = todosSlice.actions
export default todosSlice.reducer
