// =====================================
// KIDSORRA WEBSITE
// Main JavaScript
// Version 2.0
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("⭐ Welcome to Kidsorra World!");

    // =====================================
    // HERO FADE IN
    // =====================================

    const hero = document.querySelector(".hero");

    if (hero) {
        hero.style.opacity = "0";

        setTimeout(() => {
            hero.style.transition = "opacity 1s ease";
            hero.style.opacity = "1";
        }, 300);
    }

    // =====================================
    // BUTTON CLICK EFFECT
    // =====================================

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            console.log("Kidsorra Button Clicked ⭐");

        });

    });

    // =====================================
    // COUNTER ANIMATION
    // =====================================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        counter.innerText = "0";

        const target = Number(counter.dataset.target);

        const updateCounter = () => {

            const current = Number(counter.innerText);

            const increment = target / 120;

            if (current < target) {

                counter.innerText = Math.ceil(current + increment);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

    // =====================================
    // SCROLL ANIMATION
    // =====================================

    const fadeElements = document.querySelectorAll(
        ".section-title, .program-card, .why-card, .experience-card, .journey-step, .schools-container, .meet-container, .testimonial, .stat"
    );

    fadeElements.forEach(element => {

        element.classList.add("fade-up");

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    fadeElements.forEach(element => {

        observer.observe(element);

    });

});
