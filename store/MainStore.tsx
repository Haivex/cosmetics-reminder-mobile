import { TaskData, Time } from '../screens/TabOneScreen';

export type Task = {
  index: number;
  title: string;
  time: Time;
  date: Date;
  completed: boolean;
};

type AppState = {
  todos: Task[];
};

export const initialState: AppState = {
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
      date: new Date(2021, 7, 20),
      completed: false,
    },
    {
      index: 2,
      title: 'Build something fun!',
      time: { hours: 14, minutes: 50 },
      date: new Date(),
      completed: false,
    },
  ],
};

type Action = { type: 'ADD_TODO'; payload: TaskData };

export default function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            index: state.todos[state.todos.length - 1].index + 1,
            title: action.payload.title,
            date: action.payload.date,
            time: action.payload.time,
            completed: false,
          },
        ],
      };
    default:
      throw new Error();
  }
}
