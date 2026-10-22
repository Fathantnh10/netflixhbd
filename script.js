
// Accessible Get Help dropdown on the sign-in page.
(function initGetHelp(){
  const toggle=document.getElementById("getHelpToggle");
  const menu=document.getElementById("getHelpMenu");
  if(!toggle||!menu)return;
  const close=()=>{toggle.setAttribute("aria-expanded","false");menu.hidden=true;};
  toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));menu.hidden=!open;});
  document.addEventListener("pointerdown",e=>{if(!toggle.contains(e.target)&&!menu.contains(e.target))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();toggle.focus();}});
  menu.addEventListener("click",e=>{const link=e.target.closest("a[data-help-action]");if(!link)return;e.preventDefault();const action=link.dataset.helpAction;const error=document.getElementById("loginError");if(action==="forgot"){const email=document.getElementById("email");if(email){email.focus();email.setCustomValidity("Enter the email address or mobile number used to sign in.");email.addEventListener("input",()=>email.setCustomValidity(""),{once:true});}}else if(action==="learn"){if(error){error.textContent="Enter your email address or mobile number, then select Continue to proceed.";error.style.color="#b3b3b3";error.style.display="block";}}close();});
})();

// Demo-only accounts are read from customization.js. Never use real passwords here.
const USERS = (window.BIRTHDAY_SITE_CONFIG?.demoAccounts || [
  { email: "recipient@example.com", password: "demo1234", name: "Recipient Name" },
  { email: "sender@example.com", password: "demo5678", name: "Your Name" }
]).map(({ email, password, name }) => ({ email, password, name }));

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Step 1: Continue reveals the password field.
    const pwWrap = document.getElementById("passwordWrap");
    if (pwWrap && pwWrap.hidden) {
      const em = document.getElementById("email");
      if (!em.value.trim()) { em.focus(); return; }
      pwWrap.hidden = false;
      document.getElementById("loginBtn").textContent = "Sign In";
      document.getElementById("password").focus();
      return;
    }

    const email = (document.getElementById("email")?.value || "").trim().toLowerCase();
    const password = document.getElementById("password")?.value.trim() || "";

    const user = USERS.find(u => u.email.toLowerCase() === email && u.password === password);

    if (user) {
      if (loginError) {
        loginError.textContent = "";
        loginError.style.display = "none";
      }

      // Store the display name only; never persist the demo password.
      localStorage.setItem("netflixUser", JSON.stringify({ name: user.name }));

      const loginChime = document.getElementById("netflixSound");
      let redirectDelay = 300;
      if (loginChime) {
        loginChime.currentTime = 0;
        const playPromise = loginChime.play();
        if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
        redirectDelay = 850;
      }
      setTimeout(() => {
        window.location.href = "./profiles.html";
      }, redirectDelay);
    }
    else {
      if (loginError) {
        loginError.textContent = "Incorrect email or password.";
        loginError.style.color = "#e50914";
        loginError.style.display = "block";
      } else {
        alert("Incorrect email or password.");
      }
    }
  });

  ["email", "password"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        if (loginError) {
          loginError.textContent = "";
          loginError.style.display = "none";
        }
      });
    }
  });
}

window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNavbar") || document.querySelector(".netflix-navbar");
  if (!nav) return;

  if (window.scrollY > 20) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }
});

/* Netflix-inspired home-page interactions. Runs only where the corresponding UI exists. */
(function initNetflixHomeExperience() {
  const init = () => {
    const homePage = document.body.classList.contains("home-page");
    if (!homePage) return;

    // Generic profile avatars are shared by the selection page and navbar menu.
    const profileToggle = document.getElementById("profileMenuToggle");
    const profileMenu = document.getElementById("profileMenu");
    if (profileToggle && profileMenu) {
      const profileConfig = {
        recipient: { avatar: "./images/recipient-profile.png", label: window.BIRTHDAY_SITE_CONFIG?.recipientName || "Recipient Name" },
        sender: { avatar: "./images/sender-profile.png", label: window.BIRTHDAY_SITE_CONFIG?.senderName || "Your Name" }
      };
      const storedProfile = localStorage.getItem("netflixProfile");
      const currentProfile = profileConfig[storedProfile] ? storedProfile : "recipient";
      const activeAvatar = document.getElementById("activeProfileAvatar") || profileToggle.querySelector(".netflix-profile img");
      if (activeAvatar) {
        activeAvatar.src = profileConfig[currentProfile].avatar;
        activeAvatar.alt = `${profileConfig[currentProfile].label} profile avatar`;
      }
      profileMenu.querySelectorAll("[data-switch-profile]").forEach((button) => {
        const profileName = button.dataset.switchProfile;
        const image = button.querySelector("img");
        if (image && profileConfig[profileName]) image.src = profileConfig[profileName].avatar;
        button.classList.toggle("is-current", profileName === currentProfile);
        button.setAttribute("aria-current", profileName === currentProfile ? "true" : "false");
      });
      const closeProfileMenu = () => {
        profileMenu.hidden = true;
        profileToggle.setAttribute("aria-expanded", "false");
      };
      profileToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = profileMenu.hidden;
        profileMenu.hidden = !shouldOpen;
        profileToggle.setAttribute("aria-expanded", String(shouldOpen));
      });
      profileMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        const switchButton = event.target.closest("[data-switch-profile]");
        const actionButton = event.target.closest("[data-profile-action]");
        if (switchButton) {
          const profileName = switchButton.dataset.switchProfile;
          if (!profileConfig[profileName]) return;
          localStorage.setItem("netflixProfile", profileName);
          localStorage.removeItem("pinVerified");
          window.location.href = "pin.html";
          return;
        }
        if (!actionButton) return;
        const action = actionButton.dataset.profileAction;
        if (action === "signout") {
          ["netflixUser", "netflixProfile", "pinVerified"].forEach((key) => localStorage.removeItem(key));
          window.location.href = "loginPage.html";
          return;
        }
        if (action === "account") alert("Account settings are not available in this personal replica yet.");
        else if (action === "help") window.open("https://help.netflix.com/", "_blank", "noopener,noreferrer");
        else if (action === "transfer") alert("Profile transfer is not available in this personal replica yet.");
        closeProfileMenu();
      });
      document.addEventListener("pointerdown", (event) => {
        if (!profileMenu.contains(event.target) && !profileToggle.contains(event.target)) closeProfileMenu();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !profileMenu.hidden) {
          closeProfileMenu();
          profileToggle.focus();
        }
      });
    }

    // Turn the Bootstrap grouped slides into one continuous manual horizontal row.
    // The 36 image elements and their sources remain unchanged.
    document.querySelectorAll(".netflix-carousel").forEach((carousel) => {
      const viewport = carousel.querySelector(".netflix-carousel-viewport");
      if (!viewport || viewport.dataset.trackReady === "true") return;

      const cards = Array.from(viewport.querySelectorAll(".card"));
      const track = document.createElement("div");
      track.className = "netflix-carousel-track";
      track.setAttribute("role", "list");
      track.setAttribute("aria-label", "Personal content");

      cards.forEach((card, index) => {
        card.classList.add("netflix-card");
        card.setAttribute("role", "listitem");
        card.setAttribute("tabindex", "0");
        card.dataset.cardIndex = String(index);
        const image = card.querySelector("img.card-img-top");
        if (image && !image.alt) image.alt = "Personal photo";
        track.appendChild(card);
      });

      viewport.replaceChildren(track);
      viewport.dataset.trackReady = "true";

      const prev = carousel.querySelector(".netflix-carousel-prev");
      const next = carousel.querySelector(".netflix-carousel-next");
      const updateControls = () => {
        const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth - 2);
        if (prev) {
          prev.classList.toggle("is-hidden", track.scrollLeft <= 2);
          prev.disabled = track.scrollLeft <= 2;
        }
        if (next) {
          next.classList.toggle("is-hidden", maxScroll <= 2 || track.scrollLeft >= maxScroll);
          next.disabled = maxScroll <= 2 || track.scrollLeft >= maxScroll;
        }
      };
      const scrollByPage = (direction) => {
        const amount = Math.max(220, viewport.clientWidth * 0.78) * direction;
        viewport.scrollBy({ left: amount, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      };
      if (prev) prev.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); scrollByPage(-1); });
      if (next) next.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); scrollByPage(1); });
      viewport.addEventListener("scroll", updateControls, { passive: true });
      window.addEventListener("resize", updateControls);
      updateControls();
    });

    // Create one floating hover preview at a time. It is portaled to body so the
    // horizontal carousel viewport cannot clip the preview or alter thumbnail layout.
    let activeCard = null;
    let activePreview = null;
    let showTimer = null;
    let hideTimer = null;

    const clearShowTimer = () => { if (showTimer) { window.clearTimeout(showTimer); showTimer = null; } };
    const clearHideTimer = () => { if (hideTimer) { window.clearTimeout(hideTimer); hideTimer = null; } };

    const hidePreview = (immediate = false) => {
      clearShowTimer();
      clearHideTimer();
      if (!activePreview) return;
      const preview = activePreview;
      activePreview = null;
      activeCard = null;
      preview.classList.remove("is-visible");
      if (immediate) preview.remove();
      else window.setTimeout(() => preview.remove(), 180);
    };

    const scheduleHide = (delay = 140) => {
      clearHideTimer();
      hideTimer = window.setTimeout(() => hidePreview(), delay);
    };

    const openPlayModal = () => {
      const modalElement = document.getElementById("videoModal");
      if (!modalElement || !window.bootstrap?.Modal) return;
      window.bootstrap.Modal.getOrCreateInstance(modalElement).show();
    };

    const showPreview = (card) => {
      clearShowTimer();
      clearHideTimer();
      if (activeCard === card && activePreview) return;
      hidePreview(true);

      const originalImage = card.querySelector("img.card-img-top");
      const originalBody = card.querySelector(".card-body");
      if (!originalImage || !originalBody) return;

      const sections = Array.from(originalBody.querySelectorAll("section"));
      const metaSection = sections[1] || null;
      const metaNodes = metaSection ? Array.from(metaSection.querySelectorAll(".netflix-card-text")) : [];
      const matchText = metaSection?.querySelector("p.netflix-card-text")?.textContent?.trim() || "97% match";
      const categoryText = metaNodes.find((node) => !node.classList.contains("border") && node.tagName === "SPAN")?.textContent?.trim() || "Personal photo";
      const qualityText = metaSection?.querySelector(".border")?.textContent?.trim() || "HD";
      const description = originalBody.querySelector(":scope > span.netflix-card-text")?.textContent?.trim() || originalImage.alt || "Personal content";
      const source = originalImage.getAttribute("src") || originalImage.currentSrc || originalImage.src;

      const preview = document.createElement("div");
      preview.className = "netflix-hover-preview";
      preview.setAttribute("role", "dialog");
      preview.setAttribute("aria-label", `${originalImage.alt || "Photo"} preview`);

      const media = document.createElement("div");
      media.className = "hover-preview-media";
      const mediaImage = document.createElement("img");
      mediaImage.src = originalImage.currentSrc || originalImage.src;
      mediaImage.alt = originalImage.alt || "Photo preview";
      mediaImage.draggable = false;
      media.appendChild(mediaImage);
      preview.appendChild(media);

      const body = document.createElement("div");
      body.className = "preview-card-body";
      const actionRow = document.createElement("div");
      actionRow.className = "hover-preview-actions";
      const leftActions = document.createElement("div");
      leftActions.className = "hover-preview-actions-left";

      const makeAction = (actionName, label, iconName, options = {}) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `preview-action${options.primary ? " primary-action" : ""}${options.className ? ` ${options.className}` : ""}`;
        button.dataset.previewAction = actionName;
        button.setAttribute("aria-label", label);
        button.title = label;
        if (options.pressed) button.setAttribute("aria-pressed", "true");
        const icon = document.createElement("i");
        icon.className = `bi ${iconName}`;
        icon.setAttribute("aria-hidden", "true");
        button.appendChild(icon);
        return button;
      };

      const playButton = makeAction("play", "Play video", "bi-play-fill", { primary: true });
      const listButton = makeAction("list", "Add to My List", "bi-plus-lg");
      const likeButton = makeAction("like", "Like", "bi-hand-thumbs-up");
      const savedList = (() => { try { return JSON.parse(localStorage.getItem("netflixMyList") || "[]"); } catch (_) { return []; } })();
      const likedList = (() => { try { return JSON.parse(localStorage.getItem("netflixLikedItems") || "[]"); } catch (_) { return []; } })();
      if (savedList.includes(source)) {
        listButton.classList.add("is-active");
        listButton.querySelector("i").className = "bi bi-check-lg";
        listButton.setAttribute("aria-label", "Remove from My List");
        listButton.title = "Remove from My List";
      }
      if (likedList.includes(source)) {
        likeButton.classList.add("is-active");
        likeButton.setAttribute("aria-pressed", "true");
        likeButton.querySelector("i").className = "bi bi-hand-thumbs-up-fill";
        likeButton.setAttribute("aria-label", "Unlike");
        likeButton.title = "Unlike";
      }
      leftActions.append(playButton, listButton, likeButton);
      const detailsButton = makeAction("details", "More Info", "bi-chevron-down", { className: "details-action" });
      actionRow.append(leftActions, detailsButton);
      body.appendChild(actionRow);

      const metadata = document.createElement("div");
      metadata.className = "hover-preview-metadata";
      const match = document.createElement("span");
      match.className = "preview-match";
      match.textContent = matchText;
      const category = document.createElement("span");
      category.className = "preview-category";
      category.textContent = categoryText;
      const quality = document.createElement("span");
      quality.className = "preview-quality";
      quality.textContent = qualityText;
      metadata.append(match, category, quality);
      body.appendChild(metadata);

      const descriptionNode = document.createElement("p");
      descriptionNode.className = "hover-preview-description";
      descriptionNode.textContent = description;
      body.appendChild(descriptionNode);
      preview.appendChild(body);
      document.body.appendChild(preview);
      activeCard = card;
      activePreview = preview;

      const positionPreview = () => {
        if (!activePreview || activeCard !== card) return;
        const rect = card.getBoundingClientRect();
        const viewportWidth = Math.max(1, window.innerWidth);
        const viewportHeight = Math.max(1, window.innerHeight);
        const width = Math.min(380, viewportWidth - 24);
        const maxHeight = Math.max(160, viewportHeight - 24);
        preview.style.width = `${width}px`;
        preview.style.maxHeight = `${maxHeight}px`;
        preview.style.height = "auto";
        preview.style.left = `${Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, viewportWidth - width - 12))}px`;
        // Measure the visible box, not scrollHeight; scrollHeight can be larger
        // than max-height and otherwise pushes the preview partially off-screen.
        preview.style.top = "12px";
        const previewHeight = Math.min(Math.max(preview.getBoundingClientRect().height, 160), maxHeight);
        let top = rect.top - 48;
        if (top + previewHeight > viewportHeight - 12) top = viewportHeight - previewHeight - 12;
        top = Math.max(12, Math.min(top, viewportHeight - previewHeight - 12));
        preview.style.top = `${top}px`;
      };
      positionPreview();
      requestAnimationFrame(() => {
        if (activePreview !== preview) return;
        positionPreview();
        preview.classList.add("is-visible");
        // Reposition once the browser has completed the first layout pass.
        requestAnimationFrame(positionPreview);
      });
      mediaImage.addEventListener("load", () => requestAnimationFrame(positionPreview), { once: true });

      preview.addEventListener("mouseenter", () => { clearHideTimer(); clearShowTimer(); });
      preview.addEventListener("mouseleave", () => scheduleHide(140));
      preview.addEventListener("focusin", clearHideTimer);
      preview.addEventListener("focusout", (event) => {
        if (!preview.contains(event.relatedTarget)) scheduleHide(140);
      });
      preview.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-preview-action]");
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        const action = button.dataset.previewAction;
        if (action === "play") {
          hidePreview(true);
          openPlayModal();
          return;
        }
        if (action === "details") {
          hidePreview(true);
          const infoModal = document.getElementById("infoModal");
          if (infoModal && window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(infoModal).show();
          return;
        }
        if (action === "list") {
          let saved = [];
          try { saved = JSON.parse(localStorage.getItem("netflixMyList") || "[]"); } catch (_) { saved = []; }
          const alreadySaved = saved.includes(source);
          saved = alreadySaved ? saved.filter((item) => item !== source) : [...saved, source];
          localStorage.setItem("netflixMyList", JSON.stringify(saved));
          button.classList.toggle("is-active", !alreadySaved);
          button.querySelector("i").className = `bi ${alreadySaved ? "bi-plus-lg" : "bi-check-lg"}`;
          button.setAttribute("aria-label", alreadySaved ? "Add to My List" : "Remove from My List");
          button.title = alreadySaved ? "Add to My List" : "Remove from My List";
          return;
        }
        if (action === "like") {
          let liked = [];
          try { liked = JSON.parse(localStorage.getItem("netflixLikedItems") || "[]"); } catch (_) { liked = []; }
          const alreadyLiked = liked.includes(source);
          liked = alreadyLiked ? liked.filter((item) => item !== source) : [...liked, source];
          localStorage.setItem("netflixLikedItems", JSON.stringify(liked));
          button.classList.toggle("is-active", !alreadyLiked);
          button.setAttribute("aria-pressed", String(!alreadyLiked));
          button.querySelector("i").className = `bi ${alreadyLiked ? "bi-hand-thumbs-up" : "bi-hand-thumbs-up-fill"}`;
          button.setAttribute("aria-label", alreadyLiked ? "Like" : "Unlike");
          button.title = alreadyLiked ? "Like" : "Unlike";
        }
      });
    };

    document.querySelectorAll(".netflix-carousel .netflix-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        clearHideTimer();
        clearShowTimer();
        showTimer = window.setTimeout(() => showPreview(card), 240);
      });
      card.addEventListener("mouseleave", () => scheduleHide(160));
      card.addEventListener("focusin", () => {
        clearShowTimer();
        showTimer = window.setTimeout(() => showPreview(card), 120);
      });
      card.addEventListener("focusout", (event) => {
        if (activePreview && activeCard === card && !activePreview.contains(event.relatedTarget)) scheduleHide(120);
      });
      card.addEventListener("click", (event) => {
        // On touch-only devices, a tap opens the preview; normal horizontal swipes remain native.
        if (!window.matchMedia("(hover: none)").matches) return;
        if (event.target.closest("button")) return;
        if (activeCard === card && activePreview) hidePreview(true);
        else showPreview(card);
      });
    });

    document.addEventListener("pointerdown", (event) => {
      if (!activePreview) return;
      if (activePreview.contains(event.target) || activeCard?.contains(event.target)) return;
      hidePreview(true);
    });
    window.addEventListener("scroll", () => { if (activePreview) hidePreview(true); }, { passive: true, capture: true });
    window.addEventListener("resize", () => { if (activePreview) hidePreview(true); });

    // Hero mute button and modal video lifecycle.
    const backgroundVideo = document.getElementById("backgroundVideo");
    const muteToggle = document.getElementById("heroMuteToggle");
    if (backgroundVideo && muteToggle) {
      muteToggle.addEventListener("click", () => {
        backgroundVideo.muted = !backgroundVideo.muted;
        muteToggle.setAttribute("aria-pressed", String(!backgroundVideo.muted));
        muteToggle.setAttribute("aria-label", backgroundVideo.muted ? "Unmute video" : "Mute video");
        const icon = muteToggle.querySelector("i");
        if (icon) icon.className = `bi ${backgroundVideo.muted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`;
      });
    }

    const videoModal = document.getElementById("videoModal");
    const modalVideo = videoModal?.querySelector("video");
    if (videoModal && modalVideo) {
      videoModal.addEventListener("show.bs.modal", () => {
        if (backgroundVideo) backgroundVideo.pause();
      });
      videoModal.addEventListener("shown.bs.modal", () => {
        const playPromise = modalVideo.play();
        if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
      });
      videoModal.addEventListener("hidden.bs.modal", () => {
        modalVideo.pause();
        if (backgroundVideo) {
          backgroundVideo.play().catch(() => {});
          if (muteToggle) {
            backgroundVideo.muted = true;
            muteToggle.setAttribute("aria-pressed", "false");
            muteToggle.setAttribute("aria-label", "Unmute video");
            const icon = muteToggle.querySelector("i");
            if (icon) icon.className = "bi bi-volume-mute-fill";
          }
        }
      });
    }

    const infoModal = document.getElementById("infoModal");
    if (infoModal && backgroundVideo) {
      infoModal.addEventListener("show.bs.modal", () => backgroundVideo.pause());
      infoModal.addEventListener("hidden.bs.modal", () => {
        backgroundVideo.play().catch(() => {});
        backgroundVideo.muted = true;
      });
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

