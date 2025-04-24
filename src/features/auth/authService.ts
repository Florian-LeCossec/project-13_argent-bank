import api from '../../utils/axiosInstance';
import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import type { CredentialsLogin } from './authType';

type LoginResponse = {
  body: {
    token: string;
  };
};

export type LoginFailed =
  | 'Invalid Fields'
  | 'Network Error'
  | 'Server Error';

// login is a function that logs in a user
export async function login(
  credentials: CredentialsLogin,
): Promise<ResultAsync<LoginResponse['body'], LoginFailed>> {
  return ResultAsync.fromPromise(
    api.post<LoginResponse>('/user/login', credentials).then((response) => {
      if (response.data.body.token) {
        localStorage.setItem('token', response.data.body.token);
      }
      return response.data.body;
    }),
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return 'Invalid Fields';
        } else if (error.request) {
          return 'Network Error';
        }
      }
      return 'Server Error';
    },
  );
}

export function getToken() {
  return localStorage.getItem('token');
}
