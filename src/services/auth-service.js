import { Auth } from '@aws-amplify/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

Auth.configure({
  userPoolId: 'us-east-1_sPEpHeKJW',
  userPoolWebClientId: '40p3vlqq6mdaf6jsv3a1m1oe0t',
});

export class AuthService {

  static async signUp(username, email, password) {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: { email },
      });

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  }

  static async signIn(username, password) {
    try {
      const currentUser = await Auth.signIn(username, password);

      localStorage.setItem('isLoggedIn', 'true');

      console.log({ currentUser });
    } catch (err) {
      console.error(err);
    }
  }

  static async signOut() {
    try {
      await Auth.signOut();

      localStorage.setItem('isLoggedIn', 'false');
    } catch (err) {
      console.error(err);
    }
  }

  /** @returns {Promise<CognitoUser>} */
  static async getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      console.log({ user });

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  static async getIsCurrentUserVerified() {
    const info = await Auth.currentUserInfo();

    return info.attributes.email_verified;
  }

  static async resendVerificationEmail() {
    const currentUser = await this.getCurrentUser();
    const username = currentUser.getUsername();

    await Auth.resendSignUp(username);
  }

  static async getIsMfaPreferred() {
    try {
      const currentUser = await this.getCurrentUser();
      const preferredMfaType = await Auth.getPreferredMFA(currentUser);

      return preferredMfaType === 'SOFTWARE_TOKEN_MFA';
    } catch (err) {
      console.error(err);
    }
  }

  static async getMfaAuthorizationCode(user) {
    try {
      user = user || await this.getCurrentUser();
      const code = await Auth.setupTOTP(user);

      return code;
    } catch (err) {
      console.error(err);
    }
  }

  static async verifyMfaToken(token) {
    let user;

    try {
      user = await this.getCurrentUser();
    } catch (err) {
      console.error(err);
    }

    await Auth.verifyTotpToken(user, token);
    await Auth.setPreferredMFA(user, 'TOTP');
  }

  static isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
