import { User } from '../types/user';
import api from '../utils/axiosInstance';
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

export async function createUser(user: UserInput) {
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/create', { user }).then(response => response.data.body),
    () => 'create user failed',
  );
}

export async function getUser() {
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/profile').then(response => response.data.body),
    () => 'get user failed',
  );
}

export async function updateUser(user: Pick<UserInput, 'firstName' | 'lastName'>) {
  return ResultAsync.fromPromise(
    api.put<UserResponse>('/user/profile', user).then(response => response.data.body),
    () => 'update user failed',
  );
}
