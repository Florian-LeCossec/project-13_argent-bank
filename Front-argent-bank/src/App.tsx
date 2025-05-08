import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
