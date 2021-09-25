import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CyclicInterval} from '../components/CyclicTaskInputs';
import {Time} from '../components/TimePickerInput';
import {SavedTask} from '../screens/TaskCreationScreen';

export type Task = {
  id: string;
  title: string;
  time: Time;
  date: Date;
  completed: boolean;
  cyclicInterval: CyclicInterval | undefined;
};

export type RenameTaskPayload = {
  task: Task;
  title: string;
};

export type AppState = {
  todos: Task[];
};

export const globalState: AppState = {
  todos: [
    {
      id: '0',
      title: 'Learn React',
      time: {hours: 12, minutes: 50},
      date: new Date(),
      completed: true,
      cyclicInterval: undefined,
    },
    {
      id: '1',
      title: 'Learn Redux',
      time: {hours: 13, minutes: 50},
      date: new Date(2022, 7, 20),
      completed: false,
      cyclicInterval: undefined,
    },
    {
      id: '2',
      title: 'Build something fun!',
      time: {hours: 14, minutes: 50},
      date: new Date(2021, 5, 13),
      completed: false,
      cyclicInterval: undefined,
    },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: globalState,
  reducers: {
    addTodo(state, action: PayloadAction<SavedTask>) {
      state.todos = [
        ...state.todos,
        {
          id: action.payload.id,
          title: action.payload.title,
          date: new Date(action.payload.date as Date),
          time: action.payload.time,
          completed: false,
          cyclicInterval: action.payload.cyclicInterval,
        },
      ];
    },
    markTodoCompleted(state, action: PayloadAction<Task>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index].completed = true;
      }
    },
    restoreTodo(state, action: PayloadAction<Task>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index].completed = false;
      }
    },
    renameTodo(state, action: PayloadAction<RenameTaskPayload>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.task.id,
      );
      if (index !== -1) {
        state.todos[index].title = action.payload.title;
      }
    },
    deleteTodo(state, action: PayloadAction<Task>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
  },
});

export const {addTodo, markTodoCompleted, restoreTodo, renameTodo, deleteTodo} =
  todosSlice.actions;
export default todosSlice.reducer;
