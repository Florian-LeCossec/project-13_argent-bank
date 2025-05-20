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
      setError(null);
      const result = await dispatch(loginThunk(credentials));
      if (loginThunk.rejected.match(result)) {
        setError(result.payload as string);
        throw new Error(result.payload as string);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
      throw err;
    }
  }, [dispatch]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, login: loginMethod, resetError };
}
