import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
