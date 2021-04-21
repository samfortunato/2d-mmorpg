export class AuthController {

  constructor() {
    this.signUpForm = document.querySelector('#auth form');
    this.usernameField = document.querySelector('input#username');
    this.emailField = document.querySelector('input#email');
    this.passwordField = document.querySelector('input#password');

    this.signUpForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  update() { }

  handleSubmit(evt) {
    evt.preventDefault();

    const username = this.usernameField.value;
    const email = this.emailField.value;
    const password = this.passwordField.value;

    console.log({ username, email, password });
  }

}
