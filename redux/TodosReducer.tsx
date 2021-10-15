import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CyclicInterval} from '../components/CyclicTaskInputs';
import {getCurrentTasks} from '../firebase/getCurrentTasks';
import {SavedTask} from '../screens/TaskCreationScreen';
export type Task = {
  id: string;
  title: string;
  timestamp: number;
  completed: boolean;
  cyclicInterval?: CyclicInterval | undefined;
};

export type RenameTaskPayload = {
  task: Task;
  title: string;
};

export type AppState = {
  todos: Task[];
};

export const globalState: AppState = {
  todos: [],
};

export const fetchUserTasks = createAsyncThunk(
  'fetchUserTasks',
  getCurrentTasks,
);

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
          timestamp: action.payload.timestamp,
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
    editTodo(state, action: PayloadAction<Task>) {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
      const fetchedTasks = action.payload;
      const tasksWithJavascriptDate = fetchedTasks.map(task => ({
        ...task,
        timestamp: new firestore.Timestamp(
          task.date.seconds,
          task.date.nanoseconds,
        ).toMillis(),
      }));
      state.todos = [...state.todos, ...tasksWithJavascriptDate];
    });
  },
});

export const {
  addTodo,
  markTodoCompleted,
  restoreTodo,
  renameTodo,
  deleteTodo,
  editTodo,
} = todosSlice.actions;
export default todosSlice.reducer;
