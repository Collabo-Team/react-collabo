import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';

import './NavBar.css';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignout = async () => {
    if (user) {
      try {
        await signOut();
        setUser(null);
      } catch (e) {
        console.error(e.message);
      }
    }
  };

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
          <NavLink to="/user-profile/:id" className="nav-link">
            Profile
          </NavLink>
          <NavLink
            id="sign-out-link"
            to="/auth/sign-in"
            className="nav-link"
            onClick={handleSignout}
          >
            Sign Out
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
