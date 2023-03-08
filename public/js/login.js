// Log in function
const loginForm = async (event) => {
  event.preventDefault();
  console.log("hello");

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); //Send to homepage
    } else {
      $("#failed-login").modal("show");
    }
  }
};

// Sign up function
const signupForm = async (event) => {
  event.preventDefault();

  console.log("Event handler working.");
  const first_name = document.querySelector("#first-name-signup").value.trim();
  const last_name = document.querySelector("#last-name-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (first_name && last_name && username && email && password) {
    console.log("SIGNUP SUCCESSFUL....?");
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); //Send back to homepage
    } else {
      $("#failed-signup").modal("show");
    }
  }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signupForm);
