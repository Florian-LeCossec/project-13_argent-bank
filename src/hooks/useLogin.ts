
import { useState } from 'react';
import { login } from '../features/auth/authService';
import type { CredentialsLogin } from '../features/auth/authType';

// useLogin is a hook that logs in a user
export function useLogin(credentials: CredentialsLogin) {
  const [error, setError] = useState<string | null>(null);

  const loginMethod = async () => {
    const result = await login(credentials);
    // isErr() is a method from the neverthrow library that allows us to check if the result is an error
    if (result.isErr()) {
      setError(result.error);
      return;
    }
  };
  return { error, login: loginMethod };
}
