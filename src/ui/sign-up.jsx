import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useHistory } from 'react-router';

import { AuthService } from '../services/auth-service';
import { PaymentService } from '../services/payment-service';

export function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function handleSignUp(evt) {
    evt.preventDefault();

    if (canSignUp()) {
      setIsSigningUp(true);

      try {
        await AuthService.signUp(username, email, password);

        await PaymentService.handlePayment();
      } catch (err) {
        console.error(err);
      } finally {
        setIsSigningUp(false);
      }
    }
  }

  function canSignUp() {
    return hasEightCharsOrMore() &&
      hasOneOrMoreLowercaseLetters() &&
      hasOneOrMoreUppercaseLetters() &&
      hasOneOrMoreNumbers();
  }

  function hasEightCharsOrMore() { return password.length >= 8; }
  function hasOneOrMoreLowercaseLetters() { return /[a-z]/.test(password); }
  function hasOneOrMoreUppercaseLetters() { return /[A-Z]/.test(password); }
  function hasOneOrMoreNumbers() { return /\d/.test(password); }

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

        <input type="submit" value="Sign Up, Idiot!" disabled={!canSignUp() || isSigningUp} />

        {isSigningUp && <span>Loading...</span>}

        <ul id="password-requirements">
          <li data-is-valid={hasEightCharsOrMore()}>Password must be 8 characters or more</li>
          <li data-is-valid={hasOneOrMoreLowercaseLetters()}>Password must have at least 1 lowercase letter</li>
          <li data-is-valid={hasOneOrMoreUppercaseLetters()}>Password must have at least 1 uppercase letter</li>
          <li data-is-valid={hasOneOrMoreNumbers()}>Password must have at least 1 number</li>
        </ul>

        <p>You <strong>must</strong>confirm your email after signing up.</p>
        <p>
          After sign up, you will be directed to the <strong>payment form.</strong>
        </p>
        <p>
          Payment is handled by <a href="https://stripe.com/">Stripe</a>, a secure payment processor. We
           do not store ANY of your financial information.
        </p>
        <p>Payment will only be processed if you enter in your shit in the next screen.</p>
      </form>
    </>
  );
}
