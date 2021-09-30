import {configureStore} from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsReducer';
import TodosReducer from './TodosReducer';
import UserReducer from './UserReducer';

export const store = configureStore({
  reducer: {
    todos: TodosReducer,
    currentUser: UserReducer,
    notifications: NotificationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
