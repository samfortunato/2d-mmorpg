import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { AuthService } from '../services/auth-service';

export function LogIn() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(goToGameIfLoggedIn, []);

  function goToGameIfLoggedIn() {
    if (AuthService.isLoggedIn()) history.push('/');
  }

  async function handleSignUp(evt) {
    evt.preventDefault();

    setIsSigningIn(true);

    try {
      await AuthService.signIn(username, password);

      const isMfaEnabled = await AuthService.getIsMfaPreferred();

      isMfaEnabled ?
        history.push('/auth/enter-mfa-code') :
        history.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <>
      <h1>Log In</h1>

      <form id="login" onSubmit={handleSignUp}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            disabled={isSigningIn}
            onChange={evt => setUsername(evt.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            disabled={isSigningIn}
            onChange={evt => setPassword(evt.target.value)}
          />
        </label>

        <input type="submit" value="Start Playing, Idiot!" disabled={isSigningIn} />

        {isSigningIn && <span>Loading...</span>}
      </form>

      <aside id="sign-up-link">Don't have an account? <Link to="/auth/sign-up">Sign up, idiot!</Link></aside>
    </>
  );
}
