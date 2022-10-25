import React, { useState, useRef } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { authUser } from '../../services/auth';
import { useUserContext } from '../../context/UserContext';

export default function Auth() {

  const { type: authMethod } = useParams();

  const { user, setUser } = useUserContext();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [error, setError] = useState();

  const isFormValid = () => {
    let invalid = false;
    setEmailInvalid(false);
    setPasswordInvalid(false);

    if (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity()) {
      setEmailInvalid(true);
      invalid = true;
    }
    if (passwordInputRef.current.value === '') {
      setPasswordInvalid(true);
      invalid = true;
    }
    return invalid;
  };

  const handleSubmit = async () => {
    if (isFormValid()) return;

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      const userResponse = await authUser(email, password, authMethod);
      setUser(userResponse);
      <Redirect to="/" />;
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const presentableAuthMethod = authMethod === 'sign-in' ? 'Sign In' : 'Sign Up';

  if (user) return <Redirect to="/" />;

  return (
    <>
      <h1>COLLABO</h1>
      <div>
        { `Please ${presentableAuthMethod.toLocaleLowerCase()} to continue.` }
      </div>
      <div style={ { visibility: error ? 'visible' : 'hidden', color: 'red' } }>
        {
          String(error)
        }
      </div>
      <form>
        <label>Email
          <input
            placeholder="name@example.com"
            ref={ emailInputRef }
            type="email"
            onKeyUp={ (e) => e.key === 'Enter' && handleSubmit() }
          />
        </label>
        { emailInvalid ? (
          <p>Please enter a valid email address.</p>
        ) : (
          <p visibility="hidden">&nbsp;</p>
        ) }
        <label>
          Password
          <input
            placeholder="•••••••••"
            ref={ passwordInputRef }
            type="password"
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit() } />
        </label>
        {
          passwordInvalid ?
            (<p>Password is required.</p>) :
            (<p visibility="hidden">&nbsp;</p>)
        }

        <button onClick={ handleSubmit }>{ presentableAuthMethod }</button>
        {
          authMethod === 'sign-in' ?
            (
              <Link to="/auth/sign-up">
                Need to create an account? Sign Up.
              </Link>
            )
            :
            (
              <Link to="/auth/sign-in">
                Already have an account? Sign In.
              </Link>
            )
        }
      </form>
    </>
  );
}
