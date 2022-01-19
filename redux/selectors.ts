import {RootState} from './RootReducer';

export const selectCurrentUser = (state: RootState) => state.currentUser.data;
export const selectNotificationsStatus = (state: RootState) =>
  state.notifications.notificationsStatus;
export const selectGlobalState = (state: RootState) => state;
export const selectNotifications = (state: RootState) => state.notifications;
export const selectTasks = (state: RootState) => state.firestore.ordered;
export const selectTheme = (state: RootState) => state.themes.theme;
