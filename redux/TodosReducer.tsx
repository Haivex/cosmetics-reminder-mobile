import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CyclicInterval} from '../components/CyclicTaskInputs';
import {getCurrentTasks} from '../firebase/getCurrentTasks';
import {SavedTask} from '../screens/TaskCreationScreen';
export type Task = {
  id: string;
  title: string;
  date: Date;
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
  todos: [
    {
      id: '0',
      title: 'Learn React',
      date: new Date(),
      completed: true,
      cyclicInterval: undefined,
    },
    {
      id: '1',
      title: 'Learn Redux',
      date: new Date(2022, 7, 20, 13, 50),
      completed: false,
      cyclicInterval: undefined,
    },
    {
      id: '2',
      title: 'Build something fun!',
      date: new Date(2021, 5, 13, 14, 50),
      completed: false,
      cyclicInterval: undefined,
    },
  ],
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
          date: new Date(action.payload.date as Date),
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
        date: new firestore.Timestamp(
          task.date.seconds,
          task.date.nanoseconds,
        ).toDate(),
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
