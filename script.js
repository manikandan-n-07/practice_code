const signupDiv = document.getElementById("signup");
const loginDiv = document.getElementById("login");

function showLogin() {
    signupDiv.style.display = "none";
    loginDiv.style.display = "flex";
};

function showSignup() {
    loginDiv.style.display = "none";
    signupDiv.style.display = "flex";
}

// function setError(input, message) {
//     const error = input.parentElement.querySelector(".error");
//     error.innerText = message;
// };

// function clearError (input) {
//      const error = input.parentElement.querySelector(".error");
//     error.innerText = "";
// };

// function validateLoginError() {
//     let isValid = true;
//     const logEmail = document.getElementById("login-email");
//      const logPass = document.getElementById("login-pass");

//      if(logEmail.trim() === ""){
//         setError(logEmail, "Email is required");
//         isValid = false;
//      }
//      else{
//         clearError(logEmail);
//      }
     
//      if(logPass === ""){
//         setError(logPass, "Email is required");
//         isValid = false;
//      }
//      else{
//         clearError(logPass);
//      }
//  return isValid;
// }

// function validateSignup() {
//     const name = document.getElementById("signup-name").value.trim();
//     const email = document.getElementById("signup-email").value.trim();
//     const phone = document.getElementById("signup-phone").value.trim();
//     const pass = document.getElementById("signup-pass").value.trim();

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^[0-9]{10}$/;


//     if(name === ""){
//         alert("Name is required");
//         return false;
//     };

//     if(!emailPattern.test(email)){
//         alert("Email is not correct");
//         return false;
//     };

//     if(!phonePattern.test(phone)){
//         alert("Phone is not correct");
//         return false;
//     };

//     if(pass.length < 6){
//         alert("Enter an pass atleast 6 words")
//         return false;
//     };
    
//     alert("Sign up success")
//         return false;

// }

// function validateLogin() {
//     const email = document.getElementById("login-email").value.trim();
//     const pass = document.getElementById("login-pass").value;

//      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if(!emailPattern.test(email)){
//         alert("Email ID is not valid")
//         return false;
//     }

//     if(pass.length < 6){
//         alert("Enter an valid pass")
//         return false;
//     }

//     alert("Login Succes")
//     return false;
// }

function setError(input, message) {
    const error = input.parentElement.querySelector(".error");
    error.innerText = message;
    input.classList.add("invalid");
    input.classList.remove("valid");
};

function clearError(input) {
    const error = input.parentElement.querySelector(".error");
    error.innerText = "";
    input.classList.add("valid");
    input.classList.remove("invalid");
}


function validateSignupForm(input) {
    const value = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    switch(input.id) {
        case "signup-name" :
            if(value === "") {
                setError(input, "Name id required");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        case "signup-email" :
            if(!emailPattern.test(value)) {
                setError(input, "Email ID is not valid ");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        case "signup-phone" :
            if(!phonePattern.test(value)) {
                setError(input, "Phone no is not valid");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        case "signup-pass" :
            if(value.length < 7) {
                setError(input, "Password should be 7 caharacters");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        default :
            return true;
    }
}

const signupInputs = document.querySelectorAll("#signup input");
signupInputs.forEach(input => {
    input.addEventListener("input", () =>
    validateSignupForm(input));
});

function validateSignup() {
    let isValid = true;
    signupInputs.forEach(input => {
        if(!validateSignupForm(input)) 
            isValid = false;
    });
        if(isValid) {
            alert("Sign up successfull");
        }
        return isValid;
    };

function validateLoginform(input) {
    const value = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch(input.id) {
        case "login-email" :
            if(!emailPattern.test(value)) {
                setError(input, "Email ID required");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        case "login-pass" :
            if(value.length < 7) {
                setError(input, "Password should be 7 characters");
                return false;
            }
            else{
                clearError(input);
                return true;
            }

        }

};

const loginInputs = document.querySelectorAll("#login input");

      loginInputs.forEach(input => {
        input.addEventListener("input", () => 
            validateLoginform(input)
    );
});

function validateLogin() {
    let isValid = false;
    loginInputs.forEach(input => {
        if(!validateLoginform(input)){
            isValid = false;
        }

        if(isValid){
            alert("Login successful");
        }
        return isValid;
    }
    )
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if(input.type === "password"){
        input.type = "text";
        icon.innerText = "Hide Password";
    }

    else{
        input.type = "password";
        icon.innerText = "Show Password";
    }
}
