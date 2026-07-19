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





/* ==========================================================
   PART 30
   PRODUCTION READY
========================================================== */

/* ---------- Prevent Layout Shift ---------- */

img{

    height:auto;

}

/* ---------- Better Rendering ---------- */

body{

    text-rendering:optimizeLegibility;

}

/* ---------- Disable Animation for Accessibility ---------- */

@media (prefers-reduced-motion:reduce){

*{

animation:none!important;

transition:none!important;

scroll-behavior:auto!important;

}

}

/* ---------- Dark Browser Theme ---------- */

:root{

color-scheme:light;

}

/* ---------- Print ---------- */

@media print{

header,
footer,
.back-to-top,
.demo-btn,
.hero-buttons{

display:none!important;

}

section{

padding:20px 0;

page-break-inside:avoid;

}

body{

background:white;

color:black;

}

}

/* ---------- Final Helpers ---------- */

.round-xl{

border-radius:32px;

}

.round-full{

border-radius:999px;

}

.flex-center{

display:flex;

align-items:center;

justify-content:center;

}

.grid-center{

display:grid;

place-items:center;

}

.text-primary{

color:var(--primary);

}

.text-dark{

color:var(--dark);

}

.bg-light{

background:var(--light);

}

.bg-white{

background:white;

}

/* ==========================================================
   END OF KIDSORRA PREMIUM CSS
========================================================== */

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 2 / 15
==========================================*/

/* =====================================================
   HERO PARALLAX
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    const visual = document.querySelector(".hero-visual");
    const content = document.querySelector(".hero-content");
    const circle = document.querySelector(".magic-circle");

    if (!hero) return;

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;

        if (visual) {

            visual.style.transform =
                `translate(${moveX}px,${moveY}px)`;

        }

        if (content) {

            content.style.transform =
                `translate(${moveX * .3}px,${moveY * .3}px)`;

        }

        if (circle) {

            circle.style.transform =
                `translate(${moveX * .6}px,${moveY * .6}px) scale(1.05)`;

        }

    });

    hero.addEventListener("mouseleave", () => {

        if (visual) {

            visual.style.transform = "";

        }

        if (content) {

            content.style.transform = "";

        }

        if (circle) {

            circle.style.transform = "";

        }

    });

})();


/* =====================================================
   HERO MOUSE GLOW
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const glow = document.createElement("div");

    glow.className = "hero-glow";

    Object.assign(glow.style, {

        position: "absolute",

        width: "240px",

        height: "240px",

        borderRadius: "50%",

        pointerEvents: "none",

        filter: "blur(70px)",

        opacity: ".22",

        background: "rgba(255,122,24,.45)",

        transform: "translate(-50%,-50%)",

        transition: "left .08s linear, top .08s linear"

    });

    hero.appendChild(glow);

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        glow.style.left = (e.clientX - rect.left) + "px";

        glow.style.top = (e.clientY - rect.top) + "px";

    });

})();


/* =====================================================
   FLOATING TAGS ANIMATION
===================================================== */

(() => {

    const tags = document.querySelectorAll(".floating-tag");

    if (!tags.length) return;

    tags.forEach((tag, index) => {

        tag.animate(

            [

                {
                    transform: "translateY(0px)"
                },

                {
                    transform: "translateY(-12px)"
                },

                {
                    transform: "translateY(0px)"
                }

            ],

            {

                duration: 3500 + (index * 400),

                iterations: Infinity,

                easing: "ease-in-out"

            }

        );

    });

})();


/* =====================================================
   MAGIC STARS
===================================================== */

(() => {

    const stars = document.querySelectorAll(".star");

    if (!stars.length) return;

    stars.forEach((star, i) => {

        star.animate(

            [

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.25)"
                },

                {
                    transform: "scale(1)"
                }

            ],

            {

                duration: 2200 + (i * 500),

                iterations: Infinity,

                easing: "ease-in-out"

            }

        );

    });

})();

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 3 / 15
==========================================*/

/* =====================================================
   CARD TILT EFFECT
===================================================== */

(() => {

    const cards = document.querySelectorAll(

        ".program-card,.lifeskill-card,.school-card,.trust-card,.testimonial,.journey-step,.method-card"

    );

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - .5) * 12;
            const rotateX = ((y / rect.height) - .5) * -12;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

})();

/* =====================================================
   RIPPLE EFFECT
===================================================== */

(() => {

    const buttons = document.querySelectorAll(

        ".btn-primary,.btn-secondary,.demo-btn,button"

    );

    buttons.forEach(btn => {

        btn.style.position = "relative";
        btn.style.overflow = "hidden";

        btn.addEventListener("click", e => {

            const ripple = document.createElement("span");

            const rect = btn.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.position = "absolute";
            ripple.style.width = size + "px";
            ripple.style.height = size + "px";
            ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
            ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,.35)";
            ripple.style.transform = "scale(0)";
            ripple.style.transition = ".6s";
            ripple.style.pointerEvents = "none";

            btn.appendChild(ripple);

            requestAnimationFrame(() => {

                ripple.style.transform = "scale(2.8)";
                ripple.style.opacity = "0";

            });

            setTimeout(() => ripple.remove(), 600);

        });

    });

})();

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 4 / 15
==========================================*/

/* =====================================================
   PREMIUM COUNTERS
===================================================== */

(() => {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            const target = Number(el.dataset.target);

            let current = 0;

            const duration = 1800;

            const step = target / (duration / 16);

            const update = () => {

                current += step;

                if (current < target) {

                    el.textContent =
                        Math.floor(current).toLocaleString();

                    requestAnimationFrame(update);

                } else {

                    el.textContent =
                        target.toLocaleString();

                }

            };

            update();

            observer.unobserve(el);

        });

    }, {

        threshold: .4

    });

    counters.forEach(counter => observer.observe(counter));

})();

/* =====================================================
   COUNTUP SYMBOLS
===================================================== */

(() => {

    document.querySelectorAll("[data-plus]").forEach(item => {

        const value = item.dataset.plus;

        item.innerHTML += value;

    });

})();


/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 5 / 15
==========================================*/

/* =====================================================
   PREMIUM FAQ
===================================================== */

(() => {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        answer.style.maxHeight = "0px";
        answer.style.overflow = "hidden";
        answer.style.transition = ".4s ease";

        question.addEventListener("click", () => {

            items.forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                    const a = other.querySelector(".faq-answer");

                    if (a) a.style.maxHeight = "0px";

                }

            });

            item.classList.toggle("active");

            if (item.classList.contains("active")) {

                answer.style.maxHeight =
                answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = "0px";

            }

        });

    });

})();

/* =====================================================
   BOOKING FORM
===================================================== */

(() => {

    const form = document.querySelector(".booking-form");

    if (!form) return;

    form.addEventListener("submit", e => {

        e.preventDefault();

        let valid = true;

        form.querySelectorAll("input,textarea,select")

        .forEach(field => {

            field.style.borderColor="#ddd";

            if(field.hasAttribute("required")){

                if(field.value.trim()===""){

                    valid=false;

                    field.style.borderColor="#ff4d4f";

                }

            }

            if(field.type==="email"){

                const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!email.test(field.value)){

                    valid=false;

                    field.style.borderColor="#ff4d4f";

                }

            }

        });

        if(!valid){

            return;

        }

        const btn=form.querySelector("button");

        if(btn){

            const old=btn.innerHTML;

            btn.disabled=true;

            btn.innerHTML="Sending...";

            setTimeout(()=>{

                btn.innerHTML="✓ Submitted";

                btn.style.background="#35c759";

                form.reset();

                setTimeout(()=>{

                    btn.disabled=false;

                    btn.innerHTML=old;

                    btn.style.background="";

                },2500);

            },1200);

        }

    });

})();
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 6 / 15
==========================================*/

/* =====================================================
   LAZY IMAGES
===================================================== */

(() => {

    const images=document.querySelectorAll("img[data-src]");

    if(!images.length) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const img=entry.target;

            img.src=img.dataset.src;

            img.onload=()=>{

                img.classList.add("lazy-loaded");

            };

            observer.unobserve(img);

        });

    },{

        threshold:.2

    });

    images.forEach(img=>observer.observe(img));

})();

/* =====================================================
   SCROLL TO SECTION
===================================================== */

window.scrollToSection=function(id){

    const section=document.getElementById(id);

    if(!section) return;

    section.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

};

/* =====================================================
   HEADER OFFSET
===================================================== */

(() => {

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",e=>{

            const href=link.getAttribute("href");

            if(href==="#") return;

            const target=document.querySelector(href);

            if(!target) return;

            e.preventDefault();

            const top=

                target.getBoundingClientRect().top+

                window.pageYOffset-90;

            window.scrollTo({

                top,

                behavior:"smooth"

            });

        });

    });

})();

/* =====================================================
   CONSOLE
===================================================== */

console.log("%cKidsorra Engine Loaded",
"color:#ff7a18;font-size:18px;font-weight:bold;");
