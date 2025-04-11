import { useLogin } from '../hooks/useLogin';

function Login() {
  const { error, login } = useLogin({ email: 'tony@stark.com', password: 'password123' });
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => void login()}>fetch user</button>
      {error && <p>error: {error}</p>}
    </div>
  );
}

export default Login;