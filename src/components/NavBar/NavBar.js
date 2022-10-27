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
          <NavLink to="/projects" className="nav-link">
            Projects
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/user-profile/:id" className="nav-link">
            <img src={process.env.PUBLIC_URL + '/avatar-placeholder-circle.png'} className="nav-avatar" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
