import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, updateUser } from './userService';
import type { User } from './userType';

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    const result = await getUser();
    return result.match(
      (ok) => ok,
      (err) => {
        if (err === 'unauthorized') {
          localStorage.removeItem('token');
        }
        return rejectWithValue(err);
      },
    );
  },
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (user: User, { rejectWithValue }) => {
    const result = await updateUser(user);
    return result.match(
      (ok) => ok,
      (err) => rejectWithValue(err),
    );
  },
);
