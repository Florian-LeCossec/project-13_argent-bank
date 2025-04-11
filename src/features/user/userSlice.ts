import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userType';
import { getUserThunk } from './userThunk';

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;