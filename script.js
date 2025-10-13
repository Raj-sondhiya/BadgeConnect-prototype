const loginForm = document.getElementById("loginForm");
const otpForm = document.getElementById("otpForm");
const emailField = document.getElementById("email");
const verifyEmail = document.getElementById("verifyEmail");
const formSubtitle = document.getElementById("form-subtitle");
const formDesc = document.getElementById("form-desc");
const resendLink = document.getElementById("resendLink");
const timerText = document.getElementById("timer");

let timer;
let countdown = 60;

// Handle Send OTP
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailField.value.trim();
    if (!email) return alert("Please enter a valid email address!");

    // Hide login form, show OTP form
    loginForm.classList.add("d-none");
    otpForm.classList.remove("d-none");

    verifyEmail.value = email;
    formSubtitle.textContent = "Please verify your login details";
    formDesc.textContent = "";

    startTimer();
});

// Handle OTP input auto-focus
document.querySelectorAll(".otp-input").forEach((input, index, array) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < array.length - 1) {
            array[index + 1].focus();
        }
    });
});

// Countdown Timer
function startTimer() {
    resendLink.style.pointerEvents = "none";
    resendLink.style.opacity = "0.6";
    countdown = 60;

    timer = setInterval(() => {
        countdown--;
        let seconds = countdown % 60;
        timerText.textContent = `00:${seconds < 10 ? "0" + seconds : seconds}`;

        if (countdown <= 0) {
            clearInterval(timer);
            resendLink.style.pointerEvents = "auto";
            resendLink.style.opacity = "1";
            timerText.textContent = "00:00";
        }
    }, 1000);
}

// Handle Resend click
resendLink.addEventListener("click", () => {
    if (resendLink.style.pointerEvents === "auto") {
        alert("A new OTP has been sent!");
        startTimer();
    }
});
