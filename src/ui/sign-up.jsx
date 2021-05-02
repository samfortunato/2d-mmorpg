import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useHistory } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';

import { AuthService } from '../services/auth-service';
import { HttpService } from '../services/http-service';

const stripePromise = loadStripe('pk_test_a8mVaKnxIvxYfMnGkHoFyvTf');

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

        const stripe = await stripePromise;
        const session = await HttpService.jsonRequest('http://ec2-100-25-200-25.compute-1.amazonaws.com:8082/create-checkout-session', { method: 'POST' });

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) throw result.error;

        // history.push('/auth/log-in');
      } catch (err) {
        console.error(err);
      } finally {
        setIsSigningUp(false);
      }
    }
  }

  function canSignUp() {
    return hasTenCharsOrMore() &&
      hasOneOrMoreLowercaseLetters() &&
      hasOneOrMoreUppercaseLetters() &&
      hasOneOrMoreNumbers() &&
      hasOneOrMoreSpecialCharacters();
  }

  function hasTenCharsOrMore() { return password.length >= 10; }
  function hasOneOrMoreLowercaseLetters() { return /[a-z]/.test(password); }
  function hasOneOrMoreUppercaseLetters() { return /[A-Z]/.test(password); }
  function hasOneOrMoreNumbers() { return /\d/.test(password); }
  function hasOneOrMoreSpecialCharacters() { return /\W/.test(password); }

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
          <li data-is-valid={hasTenCharsOrMore()}>Password must be 10 characters or more</li>
          <li data-is-valid={hasOneOrMoreLowercaseLetters()}>Password must have at least 1 lowercase letter</li>
          <li data-is-valid={hasOneOrMoreUppercaseLetters()}>Password must have at least 1 uppercase letter</li>
          <li data-is-valid={hasOneOrMoreNumbers()}>Password must have at least 1 number</li>
          <li data-is-valid={hasOneOrMoreSpecialCharacters()}>Password must have at least 1 special character (!, @, #, etc.)</li>
        </ul>

        <p>
          Once you sign up, you will be directed to the <strong>payment form.</strong>
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
