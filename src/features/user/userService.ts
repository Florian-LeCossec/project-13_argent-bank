import { User } from './userType';
import axios from 'axios';
import api from '../../utils/axiosInstance';
import { ResultAsync } from 'neverthrow';


type UserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserResponse = {
  status: number;
  message: string;
  body: User;
};

// createUser is a function that creates a user
export async function createUser(user: UserInput): Promise<ResultAsync<User, 'create user failed'>> {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/create', { user }).then(response => response.data.body),
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return 'create user failed';
        }
      }
      return 'create user failed';
    },
  );
}

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

// updateUser is a function that updates a user
export async function updateUser(user: Pick<UserInput, 'firstName' | 'lastName'>) {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.put<UserResponse>('/user/profile', user).then(response => response.data.body),
    () => 'update user failed',
  );
}
