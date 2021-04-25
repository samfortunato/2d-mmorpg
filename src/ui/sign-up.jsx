import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useHistory } from 'react-router';

import { AuthService } from '../services/auth-service';

export function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function handleSignUp(evt) {
    evt.preventDefault();

    setIsSigningUp(true);

    try {
      await AuthService.signUp(username, email, password);

      history.push('/auth/log-in');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form id="login" onSubmit={handleSignUp}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            disabled={isSigningUp}
            onChange={evt => setUsername(evt.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            disabled={isSigningUp}
            onChange={evt => setEmail(evt.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            disabled={isSigningUp}
            onChange={evt => setPassword(evt.target.value)}
          />
        </label>

        <input type="submit" value="Sign Up, Idiot!" disabled={isSigningUp} />

        {isSigningUp && <span>Loading...</span>}

        <p>
          Once you sign up, check your email for a confirmation link.
          <strong>Confirm your email before logging in</strong>, fingus.
        </p>
      </form>
    </>
  );
}
