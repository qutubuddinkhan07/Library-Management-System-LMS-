const formContainer = document.getElementById("form-container");

// Toggle between login and signup forms
function toggleForm(formType) {
  if (formType === "signup") {
    formContainer.style.transform = "translateX(-50%)";
  } else {
    formContainer.style.transform = "translateX(0)";
  }
}

// Handle Admin Login
function handleAdminLogin() {
  const password = prompt("Enter admin password:");
  if (password === "admin123") {
    window.location.href = "/admin";
  } else {
    alert("Incorrect password!");
  }
}

// Handle Login
async function handleLogin() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username && password) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.success) {
        if (result.redirectTo === "/admin") {
          window.location.href = result.redirectTo;
        } else {
          window.location.href = `${result.redirectTo}?userId=${result.userId}`;
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  } else {
    alert("Please fill in all fields.");
  }
}

// Handle Signup
async function handleSignup() {
  const name = document.getElementById("signup-name").value;
  const contact = document.getElementById("signup-contact").value;
  const password = document.getElementById("signup-password").value;

  if (name && contact && password) {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, password }),
      });
      const result = await response.json();
      if (result.success) {
        window.location.href = `${result.redirectTo}?userId=${result.userId}`;
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  } else {
    alert("Please fill in all fields.");
  }
}
