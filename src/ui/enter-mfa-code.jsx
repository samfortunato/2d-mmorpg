import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useHistory } from 'react-router';

import { AuthService } from '../services/auth-service';

export function EnterMfaCode() {
  const history = useHistory();
  const [mfaToken, setMfaToken] = useState('');
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  async function verifyMfaToken(evt) {
    evt.preventDefault();

    try {
      await AuthService.verifyMfaToken(mfaToken);

      setIsTokenInvalid(false);

      history.push('/');
    } catch (err) {
      console.error(err);

      if (err.code === 'EnableSoftwareTokenMFAException') {
        setIsTokenInvalid(true);
      }
    }
  }

  return (
    <>
      <h1>Enter MFA Code</h1>

      <form onSubmit={verifyMfaToken}>
        <input type="text" value={mfaToken} onChange={evt => setMfaToken(evt.target.value)} />

        <input type="submit" value="Verify" disabled={mfaToken.length !== 6} />
      </form>

      {isTokenInvalid && <span>Invalid token!</span>}
    </>
  );
}
