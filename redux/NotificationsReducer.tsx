import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Notifications from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
const initialState = {
  notificationsStatus: false,
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
    togglePermission: (state, action: PayloadAction<boolean>) => {
      state.notificationsStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(toggleNotificationsStatus.fulfilled, (state, action) => {
      console.log(action.payload);
      state.notificationsStatus = action.payload;
    });
  },
});
export const {togglePermission} = notificationsSlice.actions;
export default notificationsSlice.reducer;
