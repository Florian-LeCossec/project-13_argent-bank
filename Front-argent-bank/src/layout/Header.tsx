import argentBankLogo from '../assets/logos/argentBankLogo.png';
import { Link, useLocation } from 'react-router';
import { useAppSelector, useAppDispatch } from '../hooks/rtkHooks';
import { logout } from '../features/auth/authSlice';
import { selectUser } from '../features/user/userSlice';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {!isLoginPage && (
        <>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </div>
          {isAuthenticated ? (
            <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
              <Link className="main-nav-item" to="/user-profile" onClick={() => setIsMenuOpen(false)}>
                <i className="header-icon fa fa-user-circle"></i>
                {user?.firstName}
              </Link>
              <Link className="main-nav-item" to="/" onClick={handleLogout}>
                <i className="header-icon fa fa-sign-out"></i>
                Sign Out
              </Link>
            </div>
          ) : (
            <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
              <Link className="main-nav-item" to="/login" onClick={() => setIsMenuOpen(false)}>
                <i className="header-icon fa fa-user-circle"></i>
                Sign In
              </Link>
            </div>
          )}
        </>
      )}
    </nav>
  );
}

export default Header;
