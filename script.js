// Smooth scrolling for in-page navigation
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const nav = document.querySelector(".site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const yearSpan = document.getElementById("year");

  const headerHeight = () => (header ? header.offsetHeight : 0);

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const offsetTop = window.scrollY + rect.top - headerHeight() + 4;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const targetId = href.slice(1);

      event.preventDefault();
      smoothScrollTo(targetId);

      if (nav && nav.classList.contains("open")) {
        nav.classList.remove("open");
        if (navToggle) {
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Dynamic year in footer
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
});

