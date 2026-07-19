/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 1
==========================================*/


/* =========================
PRELOADER
========================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.style.display = "none";

        }, 500);

    }

});


/* =========================
BACK TO TOP BUTTON
========================= */

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================
MOBILE MENU
========================= */

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const overlay = document.querySelector(".mobile-menu-overlay");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        overlay.classList.toggle("active");

    });

}

if (overlay) {

    overlay.addEventListener("click", () => {

        navLinks.classList.remove("active");

        overlay.classList.remove("active");

    });

}


/* =========================
SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 2
==========================================*/


/* =========================
COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let current = 0;

            const speed = target / 100;

            const updateCounter = () => {

                current += speed;

                if (current < target) {

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================
FAQ ACCORDION
========================= */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const faqItem = question.parentElement;

        const answer = faqItem.querySelector(".faq-answer");

        const plus = question.querySelector("span");

        document.querySelectorAll(".faq-answer").forEach(item => {

            if (item !== answer) {

                item.style.display = "none";

            }

        });

        document.querySelectorAll(".faq-question span").forEach(icon => {

            if (icon !== plus) {

                icon.innerHTML = "+";

            }

        });

        if (answer.style.display === "block") {

            answer.style.display = "none";

            plus.innerHTML = "+";

        } else {

            answer.style.display = "block";

            plus.innerHTML = "−";

        }

    });

});



/* =========================
BUTTON HOVER EFFECT
========================= */

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-4px)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0px)";

    });

});

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 3
==========================================*/


/* =========================
SCROLL REVEAL
========================= */

const revealItems = document.querySelectorAll(

".section-title,.hero-content,.hero-visual,.card,.program-card,.why-card,.experience-card,.lifeskill-card,.testimonial,.contact-card,.faq-item,.journey-step,.method-card,.school-card,.trust-card"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => {

    revealObserver.observe(item);

});



/* =========================
HERO FLOATING TAGS
========================= */

const floatingTags = document.querySelectorAll(".floating-tag");

floatingTags.forEach((tag, index) => {

    tag.style.animationDelay = `${index * 0.6}s`;

});



/* =========================
CURRENT YEAR FOOTER
========================= */

const footerYear = document.querySelector(".footer-year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}



/* =========================
CONSOLE MESSAGE
========================= */

console.log(

"%cKidsorra",

"color:#ff7a18;font-size:22px;font-weight:bold;"

);

console.log(

"Helping children build confidence, creativity and future-ready life skills."

);

