let login = document.querySelector(".login");

login.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  const sendData = await fetch("http://localhost:3500/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
  });
  const content = await sendData.json();
  if (content.message === "Wrong email ") {
    email.classList.remove("valid");
    email.classList.add("error");

    let errorLabel = document.querySelector("#email-error");
    if (errorLabel) {
      // If label already exists, remove it
      errorLabel.parentNode.removeChild(errorLabel);
    }
    errorLabel = document.createElement("label");
    errorLabel.setAttribute("id", "email-error");
    errorLabel.setAttribute("class", "error");
    errorLabel.setAttribute("for", "email");
    errorLabel.innerText = "Wrong email";
    window.setTimeout(() => {
      location.assign("/admin/login");
      alert(`Wrong user name or password`);
      return;
    });
    return;
  } else if (content.message === " Wrong password") {
    const errorLabel = document.createElement("label");
    errorLabel.setAttribute("id", "password-error");
    errorLabel.setAttribute("class", "error");
    errorLabel.setAttribute("for", "password");
    errorLabel.innerText = "Wrong password";
    window.setTimeout(() => {
      location.assign("/admin/login");
      alert(`Wrong user name or password`);
      return;
    });
  }

  window.setTimeout(() => {
    if (content.role == 0) {
      showToast("Login successfully!");
    }
    if (content.role == 1) {
      location.assign("/admin/dashboard");
    }
  }, 200);
});
