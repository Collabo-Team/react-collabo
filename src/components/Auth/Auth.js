import React, { useState, useRef } from 'react';
import { useParams, Link as RouterLink, Redirect } from 'react-router-dom';
import { authUser } from '../../services/auth';
import { useUserContext } from '../../context/UserContext';

const Auth = () => {

  const { type: authMethod } = useParams();

  const { user, setUser } = useUserContext();

  // https://reactjs.org/docs/hooks-reference.html#useref
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [error, setError] = useState();

  //check the validity of the current sign-in attempt
  const validUser = () => {
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

  //submit the form for validation
  const handleSubmit = async () => {
    if (validUser()) return;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      const userResponse = await authUser(email, password, authMethod);
      setUser(userResponse);
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const displayAuthMethod = authMethod === 'sign-in' ? 'Sign In' : 'Sign Up';

  if (user) return <Redirect to="/" />;

  return (
    <>
      <h1>COLLABO</h1>
      <div>
        { `Please ${displayAuthMethod.toLowerCase()} to continue.` }
      </div>
      <div style={ { visibility: error ? 'visible' : 'hidden' } }>
        {
          String(error)
        }
      </div>
      <form noValidate>
        <label>
          Email
          <input placeholder="name@example.com" ref={ emailInputRef } type="email" onKeyUp={
            (e) => (e.key === 'Enter' && handleSubmit())
          } />
        </label>
        {
          emailInvalid ?
            (<p>Please enter a valid email address.</p>) :
            (<p style={ { visibility: 'hidden' } }>&nbsp;</p>)
        }
        <label>
          Password
          <input placeholder="•••••••••" ref={ passwordInputRef } type="password" onKeyUp={
            (e) => e.key === 'Enter' && handleSubmit() } />
        </label>
        {
          passwordInvalid ?
            (<p>Password is required.</p>) :
            (<p visibility="hidden">&nbsp;</p>)
        }
      </form>
      <button onClick={ handleSubmit }>{ displayAuthMethod }</button>
      {
        authMethod === 'sign-in' ?
          (
            <RouterLink to="/auth/sign-up">
          Need to create an account? Sign Up.
            </RouterLink>
          )
          :
          (
            <RouterLink to="/auth/sign-in">
          Already have an account? Sign In.
            </RouterLink>
          )
      }
    </>
  );
};

export default Auth;