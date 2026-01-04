/**
 * UI Logic (Mobile Menu, Scroll Effects)
 */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  let isMenuOpen = false;

  // Navbar Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled", "backdrop-blur-md");
      navbar.classList.remove("bg-dark-950/0", "border-transparent");
    } else {
      navbar.classList.remove("nav-scrolled", "backdrop-blur-md");
      navbar.classList.add("bg-dark-950/0", "border-transparent");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  // Mobile Menu Animation logic using GSAP
  // (Timeline is defined here but triggered by menu button)
  const menuTl = gsap.timeline({ paused: true });

  menuTl
    .fromTo(
      mobileMenu,
      { height: 0, opacity: 0, display: "none" },
      {
        height: "auto",
        opacity: 1,
        display: "block",
        duration: 0.4,
        ease: "power2.out",
      }
    )
    .fromTo(
      mobileLinks,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

  const toggleMenu = () => {
    if (!isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      menuTl.play();
    } else {
      menuTl.reverse().eventCallback("onReverseComplete", () => {
        mobileMenu.classList.add("hidden");
      });
    }
    isMenuOpen = !isMenuOpen;
  };

  menuBtn.addEventListener("click", toggleMenu);

  // Close menu on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuTl.reverse().eventCallback("onReverseComplete", () => {
        mobileMenu.classList.add("hidden");
        isMenuOpen = false;
      });
    });
  });
});
