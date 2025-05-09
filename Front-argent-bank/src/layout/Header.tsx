import argentBankLogo from '../assets/logos/argentBankLogo.png';
import { Link, useLocation } from 'react-router';
import { useAppSelector, useAppDispatch } from '../hooks/rtkHooks';
import { logout } from '../features/auth/authSlice';
import { selectUser } from '../features/user/userSlice';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
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
      {isAuthenticated ? (
        <div>
          <Link className="main-nav-item" to="/user-profile">
            <i className="fa fa-user-circle"></i>
            {' '}
            {user?.firstName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            {' '}
            Sign Out
          </Link>
        </div>
      ) : (
        !isLoginPage && (
          <div>
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              {' '}
              Sign In
            </Link>
          </div>
        )
      )}
    </nav>
  );
}

export default Header;
