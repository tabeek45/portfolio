/**
 * GSAP Scroll-based Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Hero Entrance Animation
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
        
        heroTl.from(".hero-reveal", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            clearProps: "all"
        });

        // Section Reveal on Scroll
        gsap.utils.toArray(".section-reveal").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                clearProps: "all"
            });
        });
    } else {
        // If reduced motion is preferred, ensure visibility
        gsap.set(".hero-reveal, .section-reveal", { opacity: 1, y: 0 });
    }
});
