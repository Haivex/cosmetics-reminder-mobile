import { configureStore} from '@reduxjs/toolkit';
import LoginReducer from './LoginReducer';
import TodosReducer from './TodosReducer';

export const store = configureStore({
  reducer: {
    todos: TodosReducer,
    login: LoginReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
