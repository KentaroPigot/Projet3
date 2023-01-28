class LoginView {
  loginForm = document.querySelector('#login-form');
  emailInput = document.querySelector('#email');
  passwordInput = document.querySelector('#password');
  loginBtn = document.querySelector('#login-btn');

  wrongLoginFormatRender(email, password) {
    if (email && password) {
      return; //faire que ça fonctionne
    }
    if (!email) this.emailInput.style.border = '2px solid red';
    if (!password) this.passwordInput.style.border = '2px solid red';
  }

  wrongLoginRender() {
    this.loginBtn.style.backgroundColor = 'red';
    // Ajouter un message comme quoi c'est pas bon sur la page
  }
}

export default new LoginView();
