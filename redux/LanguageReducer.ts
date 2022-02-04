import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Language {
  currentLanguage: 'auto' | 'polish' | 'english';
}

const initialState: Language = {
  currentLanguage: 'auto',
};

const languageSlice = createSlice({
  initialState: initialState,
  name: 'language',
  reducers: {
    changeLanguage(state, action: PayloadAction<Language['currentLanguage']>) {
      state.currentLanguage = action.payload;
    },
  },
});

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;
