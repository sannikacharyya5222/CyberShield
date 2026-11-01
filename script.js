// ==================================
// CYBERSHIELD - JAVASCRIPT
// ==================================


// 1. PASSWORD STRENGTH CHECKER

const passwordInput = document.getElementById("passwordInput");
const passwordButton = document.getElementById("checkPassword");
const passwordResult = document.getElementById("passwordResult");

passwordButton.addEventListener("click", function () {

    const password = passwordInput.value;

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (password.length === 0) {
        passwordResult.textContent = "Please enter a password.";
    }

    else if (score <= 2) {
        passwordResult.textContent = "Weak Password";
        passwordResult.style.color = "red";
    }

    else if (score <= 4) {
        passwordResult.textContent = "Moderate Password";
        passwordResult.style.color = "orange";
    }

    else {
        passwordResult.textContent = "Strong Password!";
        passwordResult.style.color = "green";
    }

});


// 2. SUSPICIOUS URL CHECKER

const urlInput = document.getElementById("urlInput");
const urlButton = document.getElementById("checkURL");
const urlResult = document.getElementById("urlResult");

urlButton.addEventListener("click", function () {

    const url = urlInput.value.trim();

    if (url.length === 0) {
        urlResult.textContent = "Please enter a URL.";
        urlResult.style.color = "red";
        return;
    }

    let reasons = [];

    let parsedURL;

    try {

        parsedURL = new URL(
            /^https?:\/\//i.test(url) ? url : "https://" + url
        );

    } catch (error) {

        urlResult.textContent = "Invalid URL format.";
        urlResult.style.color = "red";
        return;

    }

    if (parsedURL.protocol !== "https:") {
        reasons.push("Not using HTTPS");
    }

    if (parsedURL.hostname.includes("@")) {
        reasons.push("Contains an unusual @ symbol");
    }

    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(parsedURL.hostname)) {
        reasons.push("Uses an IP address instead of a domain name");
    }

    if (parsedURL.hostname.split(".").length > 4) {
        reasons.push("Unusually many subdomains");
    }

    if (url.length > 100) {
        reasons.push("Unusually long URL");
    }

    if (reasons.length > 0) {

        urlResult.textContent =
            "Warning signs: " + reasons.join(", ");

        urlResult.style.color = "red";

    } else {

        urlResult.textContent =
            "No obvious warning signs detected. Still verify the website.";

        urlResult.style.color = "green";

    }

});