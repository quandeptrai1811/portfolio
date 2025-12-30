document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme or default to dark
    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        if (currentTheme === "light") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    });

    // Scroll Effect for Navbar
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Simple animation or icon change could be added here
        hamburger.classList.toggle("toggle");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("toggle");
        });
    });

    // Smooth Scroll for Anchor Links (Safari/Old browsers compatibility if needed, though CSS does most of it)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll(
        ".glass-card, .btn, .section-title, .hero-content > *"
    );
    animateElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Add class for the transition
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
