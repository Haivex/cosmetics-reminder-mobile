import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  initialState: initialState,
  name: 'theme',
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeState['theme']>) {
      state.theme = action.payload;
    },
  },
});

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;
