import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Notifications from 'react-native-push-notification';

interface StoredNotification {
  notificationId: number;
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

export const toggleNotificationsStatus = createAsyncThunk(
  'toggleNotificationsStatus',
  (status: boolean) => {
    if (status) {
      Notifications.abandonPermissions();
      return false;
    }
    return Notifications.requestPermissions(['alert']).then(
      permission => {
        return permission.alert || false;
      },
      () => false,
    );
  },
);

export const checkPermissions = createAsyncThunk(
  'checkPermissions',
  (_, api) => {
    Notifications.checkPermissions(permissions => {
      api.dispatch(togglePermission(permissions.alert || false));
    });
  },
);

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
  },
  extraReducers: builder => {
    builder.addCase(toggleNotificationsStatus.fulfilled, (state, action) => {
      state.notificationsStatus = action.payload;
    });
  },
});
export const {togglePermission, addNotification} = notificationsSlice.actions;
export default notificationsSlice.reducer;
