"use strict";

const loginForm = document.querySelector("#login-form");
const emailLogin = loginForm.querySelector("#email");
const passwordLogin = loginForm.querySelector("#password");
const btnLogin = document.querySelector("#login-btn");

let token;

console.log(loginForm, emailLogin, passwordLogin);

emailLogin.addEventListener("focusout", function () {
  const email = emailLogin.value.toLowerCase();
  console.log(email);
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    console.log("OUI");
    //si warning, l'enlever
    if (this.style.border) this.style.border = "none";
  } else {
    console.log("no");
    this.style.border = "2px solid red";
  }
});

passwordLogin.addEventListener("focusout", function () {
  const password = passwordLogin.value;
  console.log(password);
  if (password !== "") {
    //si warning, l'enlever
    if (this.style.border) this.style.border = "none";
  } else {
    this.style.border = "2px solid red";
  }
});

btnLogin.addEventListener("click", async function (e) {
  e.preventDefault();

  const a = emailLogin.value;
  const b = passwordLogin.value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: a,
      password: b,
    }),
  });
  console.log(response);

  const content = await response.json();

  console.log(content);

  token = content.token;
  console.log(token);

  localStorage.setItem("Token", token);

  location.href = "index.html";
});

// let user = {
//   name: 'John',
//   surname: 'Smith'
// };

// let response = await fetch('/article/fetch/post/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });
