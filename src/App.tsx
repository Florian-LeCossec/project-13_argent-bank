import { useLogin } from './hooks/useLogin';
function App() {
  const { error, login } = useLogin({ email: 'tony@stark.com', password: 'password123' });
  return (
    <>
      <h1 className="text-3xl font-bold text-red-700">hello world</h1>
      <button onClick={() => void login()}>fetch user</button>
      {error && <p>error: {error}</p>}
    </>
  );
}

export default App;
