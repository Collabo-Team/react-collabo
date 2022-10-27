import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser, setAuthError, authError } = useUserContext();

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
          <p id="auth-header">Sign in to your account</p>
        </div>
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
          Submit
        </button>
      </div>
    </>
  );
}
