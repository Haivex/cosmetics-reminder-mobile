import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as React from 'react';

export type AuthInfo = {
    authProvider: 'APPLE' | 'GOOGLE' | 'FACEBOOK',
    authData: Record<string, any>
}

export type LoginInfo = {
    isLogged: boolean;
    userInfo: AuthInfo | null

}

const initialState: LoginInfo = {
    isLogged: false,
    userInfo: null,
}

const loginSlice = createSlice({
    name: 'loginInfo',
    initialState: initialState,
    reducers: {
        logIn(state, action: PayloadAction<AuthInfo>) {
            state.isLogged = true;
            state.userInfo = action.payload;
        },
        logOut(state, action: PayloadAction<undefined>) {
            state.isLogged = false;
            state.userInfo = null;
        }
    }
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer
