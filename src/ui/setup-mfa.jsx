import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useHistory } from 'react-router';
import QRCode from 'qrcode.react';

import { AuthService } from '../services/auth-service';

export function SetupMfa() {
  const history = useHistory();
  const [isVerified, setIsVerified] = useState(false);
  const [qrCodeValue, setQrCodeVaue] = useState('');
  const [mfaSetupToken, setMfaSetupToken] = useState('');
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  useEffect(() => void checkIsUserVerified(), []);
  useEffect(() => void setupMfa(), [isVerified]);

  async function checkIsUserVerified() {
    const isUserVerified = await AuthService.getIsCurrentUserVerified();

    setIsVerified(isUserVerified);
  }

  async function setupMfa() {
    if (isVerified) {
      const currentUser = await AuthService.getCurrentUser();
      const username = currentUser.getUsername();
      const code = await AuthService.getMfaAuthorizationCode();
      const qrCodeValue = `otpauth://totp/AWSCognito:${username}?secret=${code}`;

      setQrCodeVaue(qrCodeValue);
    }
  }

  async function handleResendVerificationEmail() {
    await AuthService.resendVerificationEmail();
  }

  async function handleVerifyMfaCode(evt) {
    evt.preventDefault();

    try {
      await AuthService.verifyMfaToken(mfaSetupToken);
      setIsTokenInvalid(false);

      await AuthService.signOut();
      history.push('/auth/log-in');
    } catch (err) {
      console.error(err);

      if (err.code === 'EnableSoftwareTokenMFAException') {
        setIsTokenInvalid(true);
      }
    }
  }

  return (
    <>
      <h1>Setup MFA</h1>

      {!isVerified && (
        <>
          <p>You must verify your email in order to set up MFA.</p>
          <button type="button" onClick={handleResendVerificationEmail}>Resend Verification Email</button>
        </>
      )}

      {qrCodeValue && (
        <>
          <QRCode value={qrCodeValue} includeMargin />

          <ol>
            <li>Download an authenticator app (like <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US">Google Authenticator</a>) onto your phone or other device.</li>
            <li>Scan the above QR code with your phone.</li>
            <li>Your phone will generate a new code every so often. Enter in the current code here:</li>
          </ol>

          <form onSubmit={handleVerifyMfaCode}>
            <input type="text" value={mfaSetupToken} onChange={(evt) => setMfaSetupToken(evt.target.value)} placeholder="Enter code..." />
            <input type="submit" value="Verify" disabled={mfaSetupToken.length !== 6} />
          </form>

          {isTokenInvalid && <span>Invalid token!</span>}
        </>
      )}
    </>
  );
}
