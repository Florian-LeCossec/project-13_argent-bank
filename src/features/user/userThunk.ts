import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from './userService';

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
