(function () {
  "use strict";

  const themeSwitch = document.getElementById("theme-switch");
  const navbar = document.getElementById("navbar");
  const navbarContent = document.querySelector(".navbar__content");
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll(
    ".hero, .about, .services, .projects, .contact"
  );
  const navLinks = document.querySelectorAll(".link--nav");

  const LS_THEME_KEY = "lightmode_active";
  let isLightMode = localStorage.getItem(LS_THEME_KEY) === "true";

  const applyTheme = (isLight) => {
    document.body.classList.toggle("lightmode", isLight);
    localStorage.setItem(LS_THEME_KEY, isLight);
  };

  applyTheme(isLightMode);

  themeSwitch.addEventListener("click", () => {
    isLightMode = !isLightMode;
    applyTheme(isLightMode);
  });

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });

  let lastScrollPos = window.pageYOffset;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > lastScrollPos && currentScrollPos > 110) {
      navbar.classList.add("navbar--hidden");
    } else {
      navbar.classList.remove("navbar--hidden");
    }
    lastScrollPos = currentScrollPos;

    navbarContent.classList.toggle("navbar--scrolled", currentScrollPos > 0);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navLinks.forEach((link) => link.classList.remove("link--on"));

          const activeLink = document.querySelector(
            `.link--nav[href="#${sectionId}"]`
          );
          if (activeLink) {
            activeLink.classList.add("link--on");
          }
        }
      });
    },
    {
      rootMargin: "-50% 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
})();
