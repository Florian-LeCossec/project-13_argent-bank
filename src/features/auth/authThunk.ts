import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './authService';
import { CredentialsLogin } from './authType';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: CredentialsLogin, { rejectWithValue }) => {
    const result = await login(credentials);
    return result.match(
      (ok) => {
        return ok;
      },
      (err) => rejectWithValue(err),
    );
  },
);