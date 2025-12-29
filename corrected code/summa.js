const signupDiv = document.getElementById("signup");
const loginDiv = document.getElementById("login");

showLogin();

// SHOW FORMS
function showLogin() {
    signupDiv.style.display = "none";
    loginDiv.style.display = "block";
}

function showSignup() {
    loginDiv.style.display = "none";
    signupDiv.style.display = "block";
}

// ERROR FUNCTIONS
function setError(input, message) {
    input.parentElement.querySelector(".error").innerText = message;
    input.classList.add("invalid");
}

function clearError(input) {
    input.parentElement.querySelector(".error").innerText = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
}

// SIGNUP VALIDATION
function validateSignup() {
    let valid = true;

    const name = signup-name;
    const email = signup-email;
    const phone = signup-phone;
    const pass = signup-pass;

    if(name.value.trim() === "") {
        setError(name, "Name required");
        valid = false;
    } else clearError(name);

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        setError(email, "Invalid email");
        valid = false;
    } else clearError(email);

    if(!/^\d{10}$/.test(phone.value)) {
        setError(phone, "Invalid phone");
        valid = false;
    } else clearError(phone);

    if(pass.value.length < 7) {
        setError(pass, "Min 7 characters");
        valid = false;
    } else clearError(pass);

    if(valid) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if(users.some(u => u.email === email.value)) {
            alert("Email already registered");
            return false;
        }

        users.push({
            name: name.value,
            email: email.value,
            phone: phone.value,
            pass: pass.value
        });

        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! Please login.");
        showLogin();
    }

    return false;
}

// LOGIN VALIDATION
function validateLogin() {
    const email = login-email.value.trim();
    const pass = login-pass.value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.pass === pass);

    if(user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }

    return false;
}

// PASSWORD TOGGLE
function togglePassword(id, el) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
    el.innerText = input.type === "password" ? "Show" : "Hide";
}
