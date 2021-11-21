import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface StoredNotification {
  notificationId: number;
  taskId: string;
}

interface TaskId {
  taskId: string;
}

export interface NotificationState {
  notificationsStatus: boolean;
  storedNotifications: StoredNotification[];
}

const initialState: NotificationState = {
  notificationsStatus: false,
  storedNotifications: [{notificationId: 1, taskId: '1'}],
};

const notificationsSlice = createSlice({
  initialState: initialState,
  name: 'notifications',
  reducers: {
    togglePermission(state, action: PayloadAction<boolean>) {
      state.notificationsStatus = action.payload;
    },
    addNotification(state, action: PayloadAction<StoredNotification>) {
      state.storedNotifications = [
        ...state.storedNotifications,
        action.payload,
      ];
    },
    clearNotifications(state) {
      state.storedNotifications = [];
    },
    cancelNotification(state, action: PayloadAction<TaskId>) {
      const stateWithoutSelectedNotification = state.storedNotifications.filter(
        notification => notification.taskId !== action.payload.taskId,
      );
      state.storedNotifications = [...stateWithoutSelectedNotification];
    },
  },
});

export const {
  togglePermission,
  addNotification,
  clearNotifications,
  cancelNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
