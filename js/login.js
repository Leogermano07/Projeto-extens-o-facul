const form = document.getElementById("loginForm");
const message = document.getElementById("message");

function showMessage(text) {
  message.textContent = text;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}


/* LOGIN */

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Preencha todos os campos.");
    return;
  }

  /*
    Aqui você pode conectar seu backend.

    Exemplo:

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  */

  showMessage("Login realizado com sucesso.");
  localStorage.setItem('ruahLoggedIn', 'true');
  localStorage.setItem('ruahUserEmail', email);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1400);
});


/* ESQUECI A SENHA */

document
  .getElementById("forgotPassword")
  .addEventListener("click", function (event) {

    event.preventDefault();

    showMessage("Página de recuperação de senha.");
  });


/* CADASTRO */

document
  .getElementById("registerButton")
  .addEventListener("click", function (event) {

    event.preventDefault();

    // Troque pela URL da sua página de cadastro
    window.location.href = "cadastro.html";
  });


/* GOOGLE */

document
  .getElementById("googleButton")
  .addEventListener("click", function (event) {

    event.preventDefault();

    /*
      Para login real com Google,
      conecte aqui o OAuth/Google Identity Services
      do seu backend.
    */

    showMessage("Configure o login com Google no backend.");
  });