import { useState } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const { user, setUser } = useUserContext();

  const clickHandler = async () => {
    try {
      const userResp = await authUser(email, password, type);
      setUser(userResp);
    } catch (e) {
      setAuthError(e.message);
    }
  };

  

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {authError && <div>{authError}</div>}
      <div className="form-content">
        <div id="sign-in-p">
          <p id="auth-header">
            {type === 'sign-in' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>
        <div id="auth-form">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="sign-in-btn" className="collabo-btn" onClick={clickHandler}>
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </button>
          {type === 'sign-in' ? (
            <Link className="auth-link" to="/auth/sign-up">
              Need to create an account?
            </Link>
          ) : (
            <Link className="auth-link" to="/auth/sign-in">
              Already have an account?
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
