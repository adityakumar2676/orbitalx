"use strict";

/* ==========================================================================
   ELEMENTS
   ========================================================================== */

const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".navbar__hamburger");
const mobileMenu = document.querySelector(".navbar__mobile-menu");

const mobileLinks = document.querySelectorAll(".navbar__mobile-link");

const navLinks = document.querySelectorAll(
    ".navbar__link, .navbar__mobile-link",
);

const sections = document.querySelectorAll("section");

const revealElements = document.querySelectorAll(
    ".hero, .technology, .mission, .solutions, .company, .resources, .footer",
);

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */

hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("navbar__hamburger--active");
    mobileMenu.classList.toggle("navbar__mobile-menu--open");
});

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("navbar__hamburger--active");
        mobileMenu.classList.remove("navbar__mobile-menu--open");
    });
});

/* ==========================================================================
   RESET MENU ON DESKTOP
   ========================================================================== */

window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
        hamburger?.classList.remove("navbar__hamburger--active");
        mobileMenu?.classList.remove("navbar__mobile-menu--open");
    }
});

/* ==========================================================================
   NAVBAR SCROLL
   ========================================================================== */

window.addEventListener("scroll", () => {
    navbar?.classList.toggle("navbar--scrolled", window.scrollY > 60);
});

/* ==========================================================================
   ACTIVE NAV LINK
   ========================================================================== */

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        });
    },
    {
        threshold: 0.4,
    },
);

sections.forEach((section) => sectionObserver.observe(section));

/* ==========================================================================
   SCROLL REVEAL
   ========================================================================== */

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("section--visible");
            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15,
    },
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   COUNTER ANIMATION
   ========================================================================== */

const animateCounter = (counter) => {
    const original = counter.textContent.trim();

    let target;

    if (original.includes("%")) {
        target = parseInt(original);
    } else if (original.includes("+")) {
        target = parseInt(original);
    } else {
        return;
    }

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;

            counter.textContent = original;

            clearInterval(timer);
            return;
        }

        if (original.includes("%")) {
            counter.textContent = `${current}%`;
        } else {
            counter.textContent = `${current}+`;
        }
    }, 20);
};

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target
                .querySelectorAll(".hero__stat-title")
                .forEach(animateCounter);

            counterObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.4,
    },
);

const statWrapper = document.querySelector(".hero__stat-wrapper");

if (statWrapper) {
    counterObserver.observe(statWrapper);
}
