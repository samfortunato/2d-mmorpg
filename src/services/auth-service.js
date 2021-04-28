import { Auth } from '@aws-amplify/auth';

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
      const result = await Auth.signIn(username, password);

      localStorage.setItem('isLoggedIn', 'true');

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  }

  static async signOut() {
    try {
      const result = await Auth.signOut();

      localStorage.setItem('isLoggedIn', 'false');

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  }

  static async getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      console.log({ user });
    } catch (err) {

    }
  }

  static isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
