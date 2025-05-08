import { useState, useCallback } from 'react';
import { useAppDispatch } from './rtkHooks';
import { loginThunk } from '../features/auth/authThunk';
import type { CredentialsLogin } from '../features/auth/authType';

// useLogin is a hook that logs in a user
export function useLogin() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const loginMethod = useCallback(async (credentials: CredentialsLogin) => {
    try {
      await dispatch(loginThunk(credentials)).unwrap();
    } catch (err) {
      setError(err as string);
    }
  }, [dispatch]);

  return { error, login: loginMethod };
}
