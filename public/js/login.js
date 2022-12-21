// login form handler function
const loginFormHandler = async function (event) {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint to add a user
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the user dashboard page
      // When hitting this route with auth, the user data will be retrieved and rendered on dashboard page.
      document.location.replace("/dashboard");
      // Get user data, including photo, name, number of followers, number of following, recent user posts and recent followers' posts (and render on the profile page)

      // Get all followers data (and render the followers page through handlebars)

      // Get all following data (and render the following page through handlebars)

      // Get following users' recent posts (and render on the dashboard page)
    } else {
      alert(response.statusText);
    }
  } else if (!email) {
    alert("Please enter your email address.");
  } else if (!password) {
    alert("Please enter your password.");
  }
};

// sign up form handler function
const signupFormHandler = async function (event) {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  } else if (!name) {
    alert("Please enter your name.");
  } else if (!email) {
    alert("Please enter your email.");
  } else if (!password) {
    alert("Please enter your password.");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
