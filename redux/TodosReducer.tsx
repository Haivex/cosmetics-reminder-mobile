import * as React from 'react';
import { TaskData, Time } from '../screens/TabOneScreen';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CyclicInterval } from '../components/CyclicTaskInputs';

export type Task = {
  index: number;
  title: string;
  time: Time;
  date: Date;
  completed: boolean;
  cyclicInterval: CyclicInterval | undefined
};

export type RenameTaskPayload = {
  task: Task;
  title: string;
}

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
      cyclicInterval: undefined,
    },
    {
      index: 1,
      title: 'Learn Redux',
      time: { hours: 13, minutes: 50 },
      date: new Date(2022, 7, 20),
      completed: false,
      cyclicInterval: undefined,
    },
    {
      index: 2,
      title: 'Build something fun!',
      time: { hours: 14, minutes: 50 },
      date: new Date(2021, 5, 13),
      completed: false,
      cyclicInterval: undefined,
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
        cyclicInterval: action.payload.cyclicInterval,
    }]
    },
    markTodoCompleted(state, action: PayloadAction<Task>) {
      const index = state.todos.findIndex(todo => todo.index === action.payload.index);
      if (index !== -1) state.todos[index].completed = true;
    },
    restoreTodo(state, action: PayloadAction<Task>) {
      const index = state.todos.findIndex(todo => todo.index === action.payload.index);
      if (index !== -1) state.todos[index].completed = false;
    },
    renameTodo(state, action: PayloadAction<RenameTaskPayload>) {
      const index = state.todos.findIndex(todo => todo.index === action.payload.task.index);
      if (index !== -1) state.todos[index].title = action.payload.title;
    },
    deleteTodo(state, action: PayloadAction<Task>) {
      state.todos = state.todos.filter((todo) => todo.index !== 2)
    },
  }
})

export const { addTodo, markTodoCompleted, restoreTodo, renameTodo, deleteTodo} = todosSlice.actions
export default todosSlice.reducer
