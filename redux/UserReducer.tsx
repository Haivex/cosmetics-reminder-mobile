import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type CurrentUser = {
  data: FirebaseAuthTypes.User | null;
};

const initialState: CurrentUser = {
  data: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    logIn(state, action: PayloadAction<FirebaseAuthTypes.User | null>) {
      state.data = action.payload;
    },
    logOut(state) {
      state.data = null;
    },
  },
});

export const {logIn, logOut} = currentUserSlice.actions;
export default currentUserSlice.reducer;
