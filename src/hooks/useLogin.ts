
import { useState } from 'react';
import { login } from '../services/authService';
import type { CredentialsLogin } from '../types/credentialsLogin';

export function useLogin(credentials: CredentialsLogin) {
  const [error, setError] = useState<string | null>(null);

  const loginMethod = async () => {
    const result = await login(credentials);
    console.log(result);
    if (result.isErr()) {
      setError(result.error);
      return;
    }
  };
  return { error, login: loginMethod };
}
