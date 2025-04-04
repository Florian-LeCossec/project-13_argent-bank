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

// createUser is a function that creates a user
export async function createUser(user: UserInput) {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/create', { user }).then(response => response.data.body),
    () => 'create user failed',
  );
}

// getUser is a function that gets a user
export async function getUser() {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.post<UserResponse>('/user/profile').then(response => response.data.body),
    () => 'get user failed',
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
