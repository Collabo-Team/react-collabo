/* eslint-disable no-console */
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';

import './NavBar.css';

export default function NavBar() {
  const { setUser } = useUserContext();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  };

  // ! link user avatar on {line 43} once we set up global state for user profile date
  return (
    <header>
      <nav>
        <NavLink to="/">
          <p className="logo">Collabo</p>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/start-project/:id">
            <button>Start a Collabo</button>
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>

          <NavLink to="/auth/sign-up" onClick={ handleSignOut }>Sign Out</NavLink>

          <NavLink to="/auth/sign-in" className="nav-link">
            Sign in
          </NavLink>

          <NavLink to="/user-profile/:id" className="nav-link">
            <img
              src={process.env.PUBLIC_URL + '/avatar-placeholder-circle.png'}
              className="nav-avatar"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
