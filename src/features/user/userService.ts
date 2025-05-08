import { User } from './userType';
import axios from 'axios';
import api from '../../utils/axiosInstance';
import { ResultAsync } from 'neverthrow';

type UserResponse = {
  status: number;
  message: string;
  body: User;
};

type getUserFailed = 'get user failed' | 'unauthorized';
// getUser is a function that gets a user
export async function getUser(): Promise<ResultAsync<User, getUserFailed>> {
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/profile').then((response) => response.data.body),
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) return 'unauthorized';
      }
      return 'get user failed';
    },
  );
}

type UpdateUserFailed = 'update user failed' | 'unauthorized';
// updateUser is a function that updates a user
export async function updateUser(user: Pick<User, 'firstName' | 'lastName'>): Promise<ResultAsync<User, UpdateUserFailed>> {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.put<UserResponse>('/user/profile', user).then(response => response.data.body),
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) return 'unauthorized';
      }
      return 'update user failed';
    },
  );
}
