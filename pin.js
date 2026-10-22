// === AUTH GUARD ===
const DEMO_PIN = "1234"; // Change this demo PIN when customizing the template.

const user = localStorage.getItem("netflixUser");
const profile = localStorage.getItem("netflixProfile");

const pins = document.querySelectorAll(".pin");
const errorText = document.getElementById("pinError");
const loader = document.getElementById("loader");
const tadum = document.getElementById("tadum");

let isChecking = false;

if (!user) {
  window.location.replace("loginPage.html");
} else if (!profile) {
  window.location.replace("profiles.html");
} else {
  initPin();
}

function initPin() {
  pins[0].focus();

  pins.forEach((pin, index) => {
    pin.addEventListener("input", () => {
      if (isChecking) {
        // abaikan perubahan saat verifikasi berjalan
        return;
      }

      pin.value = pin.value.replace(/[^0-9]/g, "");
      errorText.style.display = "none";

      if (pin.value && index < pins.length - 1) {
        pins[index + 1].focus();
      }

      checkPin();
    });

    pin.addEventListener("keydown", (e) => {
      if (isChecking) {
        e.preventDefault();
        return;
      }
      if (e.key === "Backspace" && pin.value === "" && index > 0) {
        pins[index - 1].focus();
      }
    });

    pin.addEventListener("paste", e => e.preventDefault());
  });

  document.querySelector(".netflix-close").onclick = () => {
    window.history.back();
  };
}

function checkPin() {
  let pinCode = "";
  pins.forEach(p => pinCode += p.value);

  if (pinCode.length === 4 && !isChecking) {
    isChecking = true;
    loader.style.display = "block";

    setTimeout(() => {
      if (pinCode === DEMO_PIN) {
        localStorage.setItem("pinVerified", "true");
        tadum.play().catch(() => {});
        // beri waktu suara berbunyi sebelum pindah halaman
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        loader.style.display = "none";
        errorText.style.display = "block";
        shakeBoxes();
        pins.forEach(p => p.value = "");
        pins[0].focus();
        isChecking = false;
      }
    }, 1200);
  }
}

function shakeBoxes() {
  pins.forEach(p => {
    p.classList.add("shake");
    setTimeout(() => p.classList.remove("shake"), 500);
  });
}
