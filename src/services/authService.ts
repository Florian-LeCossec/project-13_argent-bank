import api from '../utils/axiosInstance';
import { ResultAsync } from 'neverthrow';
import type { CredentialsLogin } from '../types/credentialsLogin';

type LoginResponse = {
  body: {
    token: string;
  };
};

export async function login(credentials: CredentialsLogin) {
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
