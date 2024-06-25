function myMenuFunction() {
    var navMenu = document.getElementById("navMenu");
    if (navMenu.className === "nav-menu") {
        navMenu.className += " responsive";
    } else {
        navMenu.className = "nav-menu";
    }
}

var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginContainer = document.getElementById("login");
var registerContainer = document.getElementById("register");

function login() {
    loginContainer.style.left = "4px";
    registerContainer.style.right = "-520px";
    loginBtn.className += " white-btn";
    registerBtn.className = "btn";
    loginContainer.style.opacity = 1;
    registerContainer.style.opacity = 0;
}

function register() {
    loginContainer.style.left = "-510px";
    registerContainer.style.right = "5px";
    loginBtn.className = "btn";
    registerBtn.className += " white-btn";
    loginContainer.style.opacity = 0;
    registerContainer.style.opacity = 1;
}