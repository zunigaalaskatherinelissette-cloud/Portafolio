"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const toast = document.querySelector(".toast");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Close the mobile menu with Escape for keyboard accessibility.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation && menuButton) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

// Reveal cards gently as they enter the viewport.
const revealItems = document.querySelectorAll(
  ".project-card, .case-card, .timeline-card, .info-panel, .skill-panel"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => item.classList.add("reveal"));
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());


// Keep project walkthrough playback tidy: pause the other demo when one starts.
document.querySelectorAll(".laptop-video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll(".laptop-video").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});


// Interactive greeting for Katherine's illustrated avatar.
const avatarButton = document.querySelector(".hero-avatar-button");
const avatarHint = document.querySelector("#hero-avatar-hint");
if (avatarButton) {
  const greet = () => {
    avatarButton.classList.remove("is-active");
    // Restart the short greeting animation on every activation.
    void avatarButton.offsetWidth;
    avatarButton.classList.add("is-active");
    avatarButton.setAttribute("aria-pressed", "true");
    if (avatarHint) avatarHint.textContent = "Hi! Thanks for visiting my portfolio ♡";
  };
  avatarButton.addEventListener("click", greet);
  avatarButton.addEventListener("animationend", (event) => {
    if (event.target.classList.contains("hero-avatar")) {
      avatarButton.classList.remove("is-active");
      avatarButton.setAttribute("aria-pressed", "false");
    }
  });
}


// Let visitors highlight a Skills card by tapping/clicking it or using the keyboard.
document.querySelectorAll("[data-skill-card]").forEach((card) => {
  const toggleCard = () => {
    const selected = card.classList.toggle("is-selected");
    card.setAttribute("aria-pressed", String(selected));
  };
  card.addEventListener("click", toggleCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  });
});
