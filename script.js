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


/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 7 / 15
==========================================*/

"use strict";

/* =====================================================
   HERO PARTICLE ENGINE
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const particleContainer = document.createElement("div");

    particleContainer.className = "hero-particles";

    Object.assign(particleContainer.style, {

        position: "absolute",

        inset: "0",

        overflow: "hidden",

        pointerEvents: "none",

        zIndex: "0"

    });

    hero.appendChild(particleContainer);

    function createParticle() {

        const p = document.createElement("span");

        const size = Math.random() * 8 + 4;

        const left = Math.random() * 100;

        const duration = Math.random() * 8 + 8;

        Object.assign(p.style, {

            position: "absolute",

            width: size + "px",

            height: size + "px",

            borderRadius: "50%",

            left: left + "%",

            bottom: "-20px",

            background:

            Math.random() > .5

                ? "rgba(255,209,102,.45)"

                : "rgba(108,99,255,.25)",

            filter: "blur(1px)",

            animation:

            `kidsorraParticle ${duration}s linear forwards`

        });

        particleContainer.appendChild(p);

        setTimeout(() => {

            p.remove();

        }, duration * 1000);

    }

    setInterval(createParticle, 700);

})();

/* =====================================================
   PARTICLE KEYFRAMES
===================================================== */

(() => {

    const style = document.createElement("style");

    style.innerHTML = `

    @keyframes kidsorraParticle{

        0%{

            transform:translateY(0) scale(1);

            opacity:0;

        }

        10%{

            opacity:1;

        }

        100%{

            transform:translateY(-110vh) scale(.4);

            opacity:0;

        }

    }

    `;

    document.head.appendChild(style);

})();

/* =====================================================
   CURSOR GLOW
===================================================== */

(() => {

    const glow = document.createElement("div");

    glow.className = "cursor-glow";

    Object.assign(glow.style, {

        position: "fixed",

        width: "24px",

        height: "24px",

        borderRadius: "50%",

        background: "rgba(255,122,24,.18)",

        pointerEvents: "none",

        transform: "translate(-50%,-50%)",

        zIndex: "999999",

        transition:

        "transform .08s linear,width .2s,height .2s"

    });

    document.body.appendChild(glow);

    window.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

    document.querySelectorAll("a,button").forEach(el => {

        el.addEventListener("mouseenter", () => {

            glow.style.width = "60px";

            glow.style.height = "60px";

        });

        el.addEventListener("mouseleave", () => {

            glow.style.width = "24px";

            glow.style.height = "24px";

        });

    });

})();

/* =====================================================
   FLOATING OBJECT ENGINE
===================================================== */

(() => {

    const objects = document.querySelectorAll(

        ".floating-tag,.star,.magic-circle"

    );

    if (!objects.length) return;

    objects.forEach((item, index) => {

        item.animate(

            [

                {

                    transform:

                    "translateY(0px)"

                },

                {

                    transform:

                    `translateY(${-12 - index * 3}px)`

                },

                {

                    transform:

                    "translateY(0px)"

                }

            ],

            {

                duration:

                3500 + index * 450,

                iterations: Infinity,

                easing: "ease-in-out"

            }

        );

    });

})();

/* =====================================================
   HERO MOUSE DEPTH
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    const visual = document.querySelector(".hero-visual");

    if (!hero || !visual) return;

    hero.addEventListener("mousemove", e => {

        const rect = hero.getBoundingClientRect();

        const x =

        (e.clientX - rect.left) / rect.width;

        const y =

        (e.clientY - rect.top) / rect.height;

        visual.style.transform =

        `translate(

        ${(x-.5)*18}px,

        ${(y-.5)*18}px

        )`;

    });

    hero.addEventListener("mouseleave", () => {

        visual.style.transform = "";

    });

})();

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 8 / 15
==========================================*/

"use strict";

/* =====================================================
   TOAST NOTIFICATION SYSTEM
===================================================== */

const Toast = (() => {

    const container = document.createElement("div");

    container.className = "kidsorra-toast-container";

    Object.assign(container.style, {

        position: "fixed",

        top: "30px",

        right: "30px",

        zIndex: "999999",

        display: "flex",

        flexDirection: "column",

        gap: "12px"

    });

    document.body.appendChild(container);

    function show(message, color = "#35c759") {

        const toast = document.createElement("div");

        toast.innerHTML = message;

        Object.assign(toast.style, {

            background: color,

            color: "#fff",

            padding: "16px 22px",

            borderRadius: "16px",

            fontWeight: "600",

            boxShadow: "0 15px 35px rgba(0,0,0,.15)",

            opacity: "0",

            transform: "translateX(40px)",

            transition: ".35s"

        });

        container.appendChild(toast);

        requestAnimationFrame(() => {

            toast.style.opacity = "1";
            toast.style.transform = "translateX(0)";

        });

        setTimeout(() => {

            toast.style.opacity = "0";
            toast.style.transform = "translateX(40px)";

            setTimeout(() => {

                toast.remove();

            }, 400);

        }, 3500);

    }

    return { show };

})();

/* =====================================================
   CONTACT FORM
===================================================== */

(() => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", e => {

        e.preventDefault();

        let valid = true;

        form.querySelectorAll("input, textarea").forEach(field => {

            field.style.borderColor = "#ddd";

            if (field.value.trim() === "") {

                valid = false;
                field.style.borderColor = "#ff4d4f";

            }

        });

        const email = form.querySelector('input[type="email"]');

        if (email) {

            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!pattern.test(email.value)) {

                valid = false;
                email.style.borderColor = "#ff4d4f";

            }

        }

        if (!valid) {

            Toast.show("Please complete all required fields.", "#ff4d4f");

            return;

        }

        const btn = form.querySelector("button");

        const original = btn.innerHTML;

        btn.disabled = true;

        btn.innerHTML = "Sending...";

        setTimeout(() => {

            btn.innerHTML = "✓ Message Sent";

            btn.style.background = "#35c759";

            Toast.show("Thank you! We'll contact you soon.");

            form.reset();

            setTimeout(() => {

                btn.disabled = false;
                btn.innerHTML = original;
                btn.style.background = "";

            }, 2500);

        }, 1200);

    });

})();

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 9 / 15
==========================================*/

"use strict";

/* =====================================================
   MAGIC CURSOR
===================================================== */

(() => {

    const cursor = document.createElement("div");

    cursor.className = "magic-cursor";

    Object.assign(cursor.style, {

        position: "fixed",

        width: "18px",

        height: "18px",

        borderRadius: "50%",

        background: "#ff7a18",

        pointerEvents: "none",

        zIndex: "999999",

        transform: "translate(-50%,-50%)",

        transition:
            "width .25s,height .25s,background .25s"

    });

    document.body.appendChild(cursor);

    window.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll(

        "button,a,.card,.program-card,.school-card"

    ).forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.style.width = "42px";
            cursor.style.height = "42px";
            cursor.style.background =
                "rgba(255,122,24,.18)";

        });

        item.addEventListener("mouseleave", () => {

            cursor.style.width = "18px";
            cursor.style.height = "18px";
            cursor.style.background = "#ff7a18";

        });

    });

})();

/* =====================================================
   ADVANCED SCROLL SPY
===================================================== */

(() => {

    const sections = document.querySelectorAll("section[id]");

    const links = document.querySelectorAll(".nav-links a");

    if (!sections.length) return;

    function activateMenu() {

        let current = "";

        sections.forEach(section => {

            const top =

                section.offsetTop - 140;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href") === "#" + current

            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activateMenu);

    activateMenu();

})();

/* =====================================================
   PERFORMANCE ENGINE
===================================================== */

(() => {

    function debounce(func, wait = 80) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                func.apply(this, args);

            }, wait);

        };

    }

    const optimizedResize = debounce(() => {

        document.body.classList.add("resized");

        setTimeout(() => {

            document.body.classList.remove("resized");

        }, 300);

    });

    window.addEventListener("resize", optimizedResize);

})();

/* =====================================================
   SECTION APPEAR EFFECT
===================================================== */

(() => {

    const blocks = document.querySelectorAll(

        ".card,.program-card,.school-card,.testimonial,.trust-card"

    );

    if (!blocks.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.animate(

                    [

                        {

                            opacity: 0,

                            transform:

                                "translateY(40px)"

                        },

                        {

                            opacity: 1,

                            transform:

                                "translateY(0)"

                        }

                    ],

                    {

                        duration: 700,

                        easing: "ease-out",

                        fill: "forwards"

                    }

                );

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: .15

        }

    );

    blocks.forEach(block => observer.observe(block));

})();

/* ==========================================
   END PART 9
==========================================*/

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 10 / 15
==========================================*/

"use strict";

/* =====================================================
   LAZY IMAGE LOADER
===================================================== */

(() => {

    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.onload = () => {

                img.classList.add("lazy-loaded");

                img.style.opacity = "1";

                img.style.transform = "scale(1)";

            };

            observer.unobserve(img);

        });

    }, {

        threshold: 0.15

    });

    images.forEach(img => {

        img.style.opacity = "0";

        img.style.transform = "scale(.96)";

        img.style.transition = ".6s ease";

        observer.observe(img);

    });

})();

/* =====================================================
   NUMBER FORMATTER
===================================================== */

(() => {

    document.querySelectorAll("[data-format-number]").forEach(item => {

        const value = Number(item.innerText);

        if (!isNaN(value)) {

            item.innerText = value.toLocaleString();

        }

    });

})();

/* =====================================================
   BUTTON LOADING EFFECT
===================================================== */

(() => {

    document.querySelectorAll(".loading-button").forEach(button => {

        button.addEventListener("click", () => {

            if (button.classList.contains("loading")) return;

            button.classList.add("loading");

            const original = button.innerHTML;

            button.innerHTML = "Loading...";

            setTimeout(() => {

                button.classList.remove("loading");

                button.innerHTML = original;

            }, 1800);

        });

    });

})();

/* =====================================================
   HERO PARALLAX BACKGROUND
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    const background = document.querySelector(".magic-background");

    if (!hero || !background) return;

    hero.addEventListener("mousemove", e => {

        const rect = hero.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;

        const y = (e.clientY - rect.top) / rect.height;

        background.style.transform =

            `translate(${(x - .5) * 20}px, ${(y - .5) * 20}px)`;

    });

    hero.addEventListener("mouseleave", () => {

        background.style.transform = "";

    });

})();

/* =====================================================
   SCROLL HELPER
===================================================== */

window.scrollToTopSmooth = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

/* =====================================================
   GLOBAL HELPER
===================================================== */

window.KidsorraUtils = {

    random(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    },

    clamp(value, min, max) {

        return Math.min(Math.max(value, min), max);

    }

};

console.log("%cKidsorra Engine Part 10 Loaded",
"color:#6c63ff;font-weight:bold;font-size:15px;");
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 11 / 15
==========================================*/

"use strict";

/* =====================================================
   PREMIUM LIGHTBOX
===================================================== */

(() => {

    const images = document.querySelectorAll(
        ".gallery img,.program-card img,.school-card img,.image-soft img"
    );

    if (!images.length) return;

    const overlay = document.createElement("div");

    overlay.className = "kidsorra-lightbox";

    Object.assign(overlay.style,{

        position:"fixed",

        inset:"0",

        background:"rgba(0,0,0,.92)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        opacity:"0",

        visibility:"hidden",

        transition:".35s ease",

        zIndex:"999999"

    });

    const image = document.createElement("img");

    Object.assign(image.style,{

        maxWidth:"90%",

        maxHeight:"88%",

        borderRadius:"18px",

        boxShadow:"0 20px 60px rgba(0,0,0,.35)",

        transform:"scale(.9)",

        transition:".35s ease"

    });

    overlay.appendChild(image);

    document.body.appendChild(overlay);

    images.forEach(img=>{

        img.style.cursor="zoom-in";

        img.addEventListener("click",()=>{

            image.src=img.src;

            overlay.style.opacity="1";

            overlay.style.visibility="visible";

            image.style.transform="scale(1)";

            document.body.style.overflow="hidden";

        });

    });

    overlay.addEventListener("click",()=>{

        overlay.style.opacity="0";

        overlay.style.visibility="hidden";

        image.style.transform="scale(.9)";

        document.body.style.overflow="";

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            overlay.click();

        }

    });

})();

/* =====================================================
   IMAGE HOVER ZOOM
===================================================== */

(() => {

    document.querySelectorAll(

        ".gallery img,.program-card img,.school-card img"

    ).forEach(img=>{

        img.style.transition=".45s ease";

        img.addEventListener("mouseenter",()=>{

            img.style.transform="scale(1.05)";

        });

        img.addEventListener("mouseleave",()=>{

            img.style.transform="scale(1)";

        });

    });

})();

/* =====================================================
   PARALLAX IMAGE EFFECT
===================================================== */

(() => {

    const visuals=document.querySelectorAll(

        ".hero-visual,.meet-image,.parents-visual"

    );

    if(!visuals.length) return;

    window.addEventListener("scroll",()=>{

        const offset=window.pageYOffset;

        visuals.forEach(el=>{

            el.style.transform=

            `translateY(${offset*0.04}px)`;

        });

    });

})();

/* =====================================================
   END PART 11
==========================================*/
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 12 / 15
==========================================*/

"use strict";

/* =====================================================
   CONFETTI ENGINE
===================================================== */

const KidsorraConfetti = (() => {

    const colors = [

        "#ff7a18",

        "#FFD166",

        "#6C63FF",

        "#35C759",

        "#FF4D6D"

    ];

    function createPiece() {

        const piece = document.createElement("div");

        const size = Math.random() * 10 + 6;

        Object.assign(piece.style, {

            position: "fixed",

            top: "-20px",

            left: Math.random() * 100 + "vw",

            width: size + "px",

            height: size * 1.4 + "px",

            background:

                colors[Math.floor(Math.random() * colors.length)],

            borderRadius: "3px",

            opacity: ".95",

            zIndex: "999999",

            transform:

                `rotate(${Math.random() * 360}deg)`,

            pointerEvents: "none"

        });

        document.body.appendChild(piece);

        const duration =

            Math.random() * 2500 + 2500;

        piece.animate(

            [

                {

                    transform:

                        `translateY(0) rotate(0deg)`,

                    opacity: 1

                },

                {

                    transform:

                        `translateY(110vh)
                        rotate(${720 + Math.random() * 720}deg)`,

                    opacity: 0

                }

            ],

            {

                duration,

                easing: "linear"

            }

        );

        setTimeout(() => {

            piece.remove();

        }, duration);

    }

    function burst(count = 80) {

        for (let i = 0; i < count; i++) {

            setTimeout(() => {

                createPiece();

            }, i * 12);

        }

    }

    return {

        burst

    };

})();

/* =====================================================
   SUCCESS BUTTON CELEBRATION
===================================================== */

(() => {

    document.querySelectorAll(

        ".celebrate-button"

    ).forEach(button => {

        button.addEventListener("click", () => {

            KidsorraConfetti.burst(90);

        });

    });

})();

/* =====================================================
   AUTO CELEBRATION
===================================================== */

window.kidsorraCelebrate = function () {

    KidsorraConfetti.burst(120);

};

/* =====================================================
   SUCCESS SCALE EFFECT
===================================================== */

(() => {

    document.querySelectorAll(

        ".success-pop"

    ).forEach(item => {

        item.addEventListener("click", () => {

            item.animate(

                [

                    {

                        transform: "scale(1)"

                    },

                    {

                        transform: "scale(1.08)"

                    },

                    {

                        transform: "scale(1)"

                    }

                ],

                {

                    duration: 500,

                    easing: "ease"

                }

            );

        });

    });

})();

/* =====================================================
   FLOATING EMOJIS
===================================================== */

(() => {

    const emojis = [

        "🎉",

        "✨",

        "🌈",

        "⭐",

        "🎈"

    ];

    window.showFloatingEmoji = function () {

        const emoji = document.createElement("div");

        emoji.innerHTML =

            emojis[Math.floor(Math.random() * emojis.length)];

        Object.assign(emoji.style, {

            position: "fixed",

            left: Math.random() * 90 + "vw",

            bottom: "20px",

            fontSize: "30px",

            zIndex: "999999",

            pointerEvents: "none"

        });

        document.body.appendChild(emoji);

        emoji.animate(

            [

                {

                    transform: "translateY(0)",

                    opacity: 1

                },

                {

                    transform: "translateY(-300px)",

                    opacity: 0

                }

            ],

            {

                duration: 2500,

                easing: "ease-out"

            }

        );

        setTimeout(() => {

            emoji.remove();

        }, 2500);

    };

})();

/* ==========================================
   END PART 12
==========================================*/
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 13 / 15
==========================================*/

"use strict";

/* =====================================================
   CURSOR TRAIL
===================================================== */

(() => {

    const colors = [
        "#ff7a18",
        "#FFD166",
        "#6C63FF"
    ];

    window.addEventListener("mousemove", e => {

        const dot = document.createElement("span");

        Object.assign(dot.style, {

            position: "fixed",

            left: e.clientX + "px",

            top: e.clientY + "px",

            width: "10px",

            height: "10px",

            borderRadius: "50%",

            background:
            colors[Math.floor(Math.random()*colors.length)],

            pointerEvents: "none",

            zIndex: "999999",

            opacity: ".7"

        });

        document.body.appendChild(dot);

        dot.animate([

            {

                transform:"translate(-50%,-50%) scale(1)",

                opacity:.8

            },

            {

                transform:"translate(-50%,-50%) scale(0)",

                opacity:0

            }

        ],{

            duration:700,

            easing:"ease-out"

        });

        setTimeout(()=>{

            dot.remove();

        },700);

    });

})();

/* =====================================================
   EASTER EGG
===================================================== */

(() => {

    let count = 0;

    const logo = document.querySelector(".logo");

    if(!logo) return;

    logo.addEventListener("click",()=>{

        count++;

        if(count===7){

            count=0;

            KidsorraConfetti.burst(180);

            Toast.show("🌈 Welcome to the Kidsorra Magic World!");

        }

    });

})();

/* =====================================================
   CARD SHINE EFFECT
===================================================== */

(() => {

    const cards = document.querySelectorAll(

        ".program-card,.school-card,.trust-card"

    );

    cards.forEach(card=>{

        card.addEventListener("mousemove",e=>{

            const rect = card.getBoundingClientRect();

            const x = e.clientX-rect.left;

            const y = e.clientY-rect.top;

            card.style.background=

            `radial-gradient(circle at ${x}px ${y}px,

            rgba(255,255,255,.9),

            #ffffff 45%)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.background="#fff";

        });

    });

})();

/* =====================================================
   RANDOM FLOATING EMOJI
===================================================== */

(() => {

    const emojis=["🌟","✨","🎈","🌈","🦄"];

    setInterval(()=>{

        const item=document.createElement("div");

        item.innerHTML=

        emojis[Math.floor(Math.random()*emojis.length)];

        Object.assign(item.style,{

            position:"fixed",

            left:Math.random()*90+"vw",

            bottom:"-40px",

            fontSize:"28px",

            pointerEvents:"none",

            zIndex:"99999"

        });

        document.body.appendChild(item);

        item.animate([

            {

                transform:"translateY(0)",

                opacity:0

            },

            {

                opacity:1

            },

            {

                transform:"translateY(-120vh)",

                opacity:0

            }

        ],{

            duration:9000,

            easing:"linear"

        });

        setTimeout(()=>{

            item.remove();

        },9000);

    },4500);

})();

/* =====================================================
   PAGE LOADED MESSAGE
===================================================== */

window.addEventListener("load",()=>{

    console.log(

        "%cKidsorra Premium Engine Active",

        "color:#ff7a18;font-size:18px;font-weight:bold;"

    );

});

/* ==========================================
   END PART 13
==========================================*/

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 14 / 15
==========================================*/

"use strict";

/* =====================================================
   ADVANCED ANIMATION ENGINE
===================================================== */

const KidsorraAnimation = (() => {

    function animate(element, options = {}) {

        if (!element) return;

        const {

            translateY = 30,

            opacity = 0,

            duration = 700,

            easing = "ease-out"

        } = options;

        element.animate(

            [

                {
                    transform: `translateY(${translateY}px)`,
                    opacity
                },
                {
                    transform: "translateY(0)",
                    opacity: 1
                }

            ],

            {

                duration,

                easing,

                fill: "forwards"

            }

        );

    }

    return {

        animate

    };

})();

/* =====================================================
   SMART OBSERVER
===================================================== */

(() => {

    const targets = document.querySelectorAll(

        ".program-card,.school-card,.trust-card,.testimonial,.journey-step,.lifeskill-card,.experience-card"

    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                KidsorraAnimation.animate(

                    entry.target,

                    {

                        translateY: 45,

                        duration: 800

                    }

                );

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: .18

        }

    );

    targets.forEach(target => observer.observe(target));

})();

/* =====================================================
   HERO AUTO FLOAT
===================================================== */

(() => {

    const visual = document.querySelector(".hero-visual");

    if (!visual) return;

    visual.animate(

        [

            {

                transform: "translateY(0px)"

            },

            {

                transform: "translateY(-14px)"

            },

            {

                transform: "translateY(0px)"

            }

        ],

        {

            duration: 4200,

            iterations: Infinity,

            easing: "ease-in-out"

        }

    );

})();

/* =====================================================
   AUTO THEME DETECTOR
===================================================== */

(() => {

    const prefersDark =

        window.matchMedia("(prefers-color-scheme: dark)");

    function detectTheme() {

        if (prefersDark.matches) {

            document.body.classList.add("system-dark");

        } else {

            document.body.classList.remove("system-dark");

        }

    }

    detectTheme();

    prefersDark.addEventListener("change", detectTheme);

})();

/* =====================================================
   RANDOM MAGIC MESSAGE
===================================================== */

(() => {

    const messages = [

        "Keep Learning 🌈",

        "Dream Big ✨",

        "Small Steps Every Day 🚀",

        "Future Starts Here 🌍",

        "You Can Do It ⭐"

    ];

    window.showMagicMessage = function () {

        Toast.show(

            messages[Math.floor(Math.random() * messages.length)],

            "#6C63FF"

        );

    };

})();

/* =====================================================
   PAGE IDLE ANIMATION
===================================================== */

(() => {

    let idle;

    function resetIdle() {

        clearTimeout(idle);

        document.body.classList.remove("page-idle");

        idle = setTimeout(() => {

            document.body.classList.add("page-idle");

        }, 15000);

    }

    [

        "mousemove",

        "keydown",

        "touchstart",

        "scroll"

    ].forEach(event => {

        window.addEventListener(event, resetIdle);

    });

    resetIdle();

})();

/* =====================================================
   END PART 14
==========================================*/

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 15 / 15
==========================================*/

"use strict";

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

window.addEventListener("error", function (event) {

    console.warn(

        "[Kidsorra]",

        event.message

    );

});

window.addEventListener("unhandledrejection", function (event) {

    console.warn(

        "[Kidsorra Promise]",

        event.reason

    );

});

/* =====================================================
   PERFORMANCE OPTIMIZER
===================================================== */

(() => {

    let ticking = false;

    function update() {

        ticking = false;

    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(update);

            ticking = true;

        }

    });

})();

/* =====================================================
   MEMORY CLEANER
===================================================== */

(() => {

    const clean = () => {

        document.querySelectorAll(

            ".temporary,.hero-particle,.cursor-trail"

        ).forEach(el => {

            if (!document.body.contains(el)) {

                el.remove();

            }

        });

    };

    setInterval(clean,15000);

})();

/* =====================================================
   VISIBILITY API
===================================================== */

(() => {

    document.addEventListener(

        "visibilitychange",

        () => {

            if(document.hidden){

                console.log("Kidsorra paused");

            }else{

                console.log("Kidsorra resumed");

            }

        }

    );

})();

/* =====================================================
   DEVICE DETECTOR
===================================================== */

window.KidsorraDevice = {

    mobile(){

        return window.innerWidth < 768;

    },

    tablet(){

        return window.innerWidth >=768 &&

               window.innerWidth <1100;

    },

    desktop(){

        return window.innerWidth >=1100;

    }

};

/* =====================================================
   RANDOM HELPERS
===================================================== */

window.KidsorraHelpers = {

    random(min,max){

        return Math.floor(

            Math.random()*(max-min+1)

        )+min;

    },

    uuid(){

        return Math.random()

        .toString(36)

        .substring(2,10);

    },

    sleep(ms){

        return new Promise(resolve=>

            setTimeout(resolve,ms)

        );

    }

};

/* =====================================================
   AUTO PRELOAD IMAGES
===================================================== */

(() => {

    const images=[

        ...document.images

    ];

    images.forEach(img=>{

        if(img.complete) return;

        const preload=new Image();

        preload.src=img.src;

    });

})();

/* =====================================================
   WELCOME MESSAGE
===================================================== */

window.addEventListener(

    "load",

    ()=>{

        console.log(

"%cKidsorra Premium Version Loaded",

"color:#ff7a18;font-size:20px;font-weight:bold;"

        );

    }

);

/* =====================================================
   FINAL INITIALIZER
===================================================== */

(() => {

    const modules=[

        "Hero",

        "Navigation",

        "Cards",

        "Journey",

        "FAQ",

        "Booking",

        "Contact",

        "Gallery",

        "Performance"

    ];

    modules.forEach(module=>{

        console.log(

            "✓ "+module+" Ready"

        );

    });

})();

/* =====================================================
   END OF KIDSORRA ENGINE
===================================================== */

