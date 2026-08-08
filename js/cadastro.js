const form = document.getElementById("registerForm");
const message = document.getElementById("message");

function showMessage(text) {
  message.textContent = text;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email || !password || !confirmPassword) {
    showMessage("Preencha todos os campos.");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("As senhas não coincidem.");
    return;
  }

  showMessage("Cadastro realizado com sucesso.");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1400);
});
