import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
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
          <NavLink id="sign-out-link" to="/auth" className="nav-link">
            Sign Out
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
