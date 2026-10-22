function selectProfile(name) {
  localStorage.setItem("netflixProfile", name);
  localStorage.removeItem("pinVerified");
  window.location.href = "pin.html";
}

(function initProfilesPage() {
  const manage = document.querySelector(".manage-btn");
  const profiles = Array.from(document.querySelectorAll(".profile"));
  if (!manage) return;
  const label = manage.querySelector("span");
  const originalLabel = label ? label.textContent : manage.textContent.trim();

  manage.addEventListener("click", () => {
    const editing = manage.dataset.editing !== "true";
    manage.dataset.editing = String(editing);
    manage.setAttribute("aria-pressed", String(editing));
    if (label) label.textContent = editing ? "Done" : originalLabel;
    else manage.textContent = editing ? "Done" : originalLabel;
    document.body.classList.toggle("profiles-editing", editing);
    profiles.forEach((profile) => profile.classList.toggle("profile-editing", editing));
  });

  profiles.forEach((profile) => {
    profile.tabIndex = 0;
    profile.setAttribute("role", "button");
    const profileKey = profile.dataset.profile;
    const visibleName = profile.querySelector("p")?.textContent?.trim() || profileKey;
    profile.setAttribute("aria-label", visibleName ? `Select ${visibleName} profile` : "Select profile");
    const choose = () => {
      if (document.body.classList.contains("profiles-editing") || !profileKey) return;
      selectProfile(profileKey);
    };
    profile.addEventListener("click", choose);
    profile.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose();
      }
    });
  });
})();
