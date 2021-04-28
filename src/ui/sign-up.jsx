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

    setIsSigningUp(true);

    try {
      await AuthService.signUp(username, email, password);

      const stripe = await stripePromise;
      const session = await HttpService.jsonRequest('http://ec2-100-25-200-25.compute-1.amazonaws.com:8082/create-checkout-session', { method: 'POST' });

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) console.error(result.error.message);

      // history.push('/auth/log-in');
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
