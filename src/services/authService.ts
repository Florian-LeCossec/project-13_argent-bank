import api from '../utils/axiosInstance';
import { ResultAsync } from 'neverthrow';
import type { CredentialsLogin } from '../types/credentialsLogin';

type LoginResponse = {
  body: {
    token: string;
  };
};

// login is a function that logs in a user
export async function login(credentials: CredentialsLogin) {
  // ResultAsync is a method from the neverthrow library that allows us to handle errors in a more type-safe way
  return ResultAsync.fromPromise(
    api.post<LoginResponse>('/user/login', credentials).then(response => {
      if (response.data.body.token) {
        localStorage.setItem('token', response.data.body.token);
      }
      return response.data;
    }),
    () => 'login failed',
  );
}

export function logout() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
