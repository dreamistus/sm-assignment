import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { register } from 'utils/api';
import { RegisterResponse } from 'utils/api/types';

export interface AuthState {
  clientId: string | null;
  email: string | null;
  sl_token: string | null;
  isLoggingIn: boolean;
}

const initialState: AuthState = {
  clientId: null,
  email: null,
  sl_token: null,
  isLoggingIn: false
};

export const logIn = createAsyncThunk<RegisterResponse, { name: string; email: string }>(
  'auth/logIn',
  register
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, state => {
        state.isLoggingIn = true;
      })
      .addCase(logIn.fulfilled, (state, { payload: { data } }) => {
        const { sl_token: token, client_id: clientId, email } = data;
        state.isLoggingIn = false;
        state.clientId = clientId;
        state.email = email;
        state.sl_token = token;
      })
      .addCase(logIn.rejected, () => initialState);
  }
});

export const { logOut } = authSlice.actions;

export const selectAuth = ({ auth }: RootState): AuthState => (auth);

export const selectToken = ({ auth: { sl_token } }: RootState): string | null => sl_token;

export default authSlice.reducer;
