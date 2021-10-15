import {combineReducers} from '@reduxjs/toolkit';
import NotificationsReducer from './NotificationsReducer';
import TodosReducer from './TodosReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  todos: TodosReducer,
  currentUser: UserReducer,
  notifications: NotificationsReducer,
});

export default rootReducer;
