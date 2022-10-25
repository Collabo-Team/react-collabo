import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser, setAuthError, authError } = useUserContext();

  const clickHandler = async () => {
    try {
      // call authUser with state
      const userResp = await authUser(email, password, type);
      // console.log({ userResp });
      // set user
      setUser(userResp);

      // redirect to /tasks
    } catch (e) {
      // console.log(e.message);
      setAuthError(e.message);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      { authError && <div>{ authError }</div> }
      <div className="form-controls">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
      </div>
      <div className="form-controls">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </div>
      <button onClick={ clickHandler }>Submit</button>
    </>
  );
}
