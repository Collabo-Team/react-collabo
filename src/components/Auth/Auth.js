import { useState } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';

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
      <div className="form-controls">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-controls">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={ clickHandler }>Submit</button>
      <br />
      {
        type === 'sign-in' ?
          <Link className='auth-link' to='/auth/sign-up'>sign-up</Link> :
          <Link className='auth-link' to='/auth/sign-in'>sign-in</Link>
      }
    </>
  );
}
