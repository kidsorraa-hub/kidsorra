/*==================================================
 KIDSORRA
 script.js
 PART 1 / 15
 Core Engine
==================================================*/

"use strict";

/*==================================================
CONFIG
==================================================*/

const Kidsorra = {

    version: "3.0.0",

    debug: false,

    selectors: {

        body: document.body,

        header: document.querySelector(".header"),

        hero: document.querySelector(".hero"),

        navbar: document.querySelector(".navbar"),

        navLinks: document.querySelector(".nav-links"),

        menuToggle: document.querySelector(".menu-toggle"),

        overlay: document.querySelector(".mobile-menu-overlay"),

        preloader: document.querySelector("#preloader"),

        backTop: document.querySelector(".back-to-top")

    }

};


/*==================================================
HELPERS
==================================================*/

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const on = (element, event, callback, options = false) => {

    if (!element) return;

    element.addEventListener(event, callback, options);

};

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

const lerp = (start, end, t) =>
    start + (end - start) * t;

const debounce = (callback, delay = 100) => {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

};

const throttle = (callback, limit = 16) => {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        waiting = true;

        callback(...args);

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

};


/*==================================================
PRELOADER
==================================================*/

const Preloader = {

    init() {

        const loader = Kidsorra.selectors.preloader;

        if (!loader) return;

        window.addEventListener("load", () => {

            loader.classList.add("loaded");

            setTimeout(() => {

                loader.remove();

            }, 600);

        });

    }

};


/*==================================================
BACK TO TOP
==================================================*/

const BackToTop = {

    init() {

        const button = Kidsorra.selectors.backTop;

        if (!button) return;

        const toggle = throttle(() => {

            if (window.scrollY > 400) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        });

        window.addEventListener("scroll", toggle);

        button.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

};


/*==================================================
MOBILE MENU
==================================================*/

const MobileMenu = {

    init() {

        const toggle = Kidsorra.selectors.menuToggle;

        const menu = Kidsorra.selectors.navLinks;

        const overlay = Kidsorra.selectors.overlay;

        if (!toggle || !menu) return;

        const closeMenu = () => {

            menu.classList.remove("active");

            overlay?.classList.remove("active");

            document.body.classList.remove("menu-open");

        };

        toggle.addEventListener("click", () => {

            menu.classList.toggle("active");

            overlay?.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        overlay?.addEventListener("click", closeMenu);

        $$(".nav-links a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

    }

};


/*==================================================
APP
==================================================*/

const App = {

    init() {

        Preloader.init();

        BackToTop.init();

        MobileMenu.init();

    }

};

App.init();

/*==================================================
 KIDSORRA
 script.js
 PART 2 / 15
 Navigation + Smooth Scroll
==================================================*/

"use strict";

/*==================================================
SMOOTH SCROLL WITH HEADER OFFSET
==================================================*/

const SmoothScroll = {

    headerOffset: 90,

    init() {

        $$('a[href^="#"]').forEach(link => {

            link.addEventListener("click", event => {

                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                const target = $(href);

                if (!target) return;

                event.preventDefault();

                const top =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    this.headerOffset;

                window.scrollTo({

                    top,

                    behavior: "smooth"

                });

            });

        });

    }

};


/*==================================================
STICKY HEADER
==================================================*/

const Header = {

    init() {

        const header = Kidsorra.selectors.header;

        if (!header) return;

        const update = throttle(() => {

            if (window.scrollY > 40) {

                header.classList.add("sticky");

            } else {

                header.classList.remove("sticky");

            }

        });

        window.addEventListener("scroll", update);

        update();

    }

};


/*==================================================
ACTIVE NAVIGATION / SCROLL SPY
==================================================*/

const ScrollSpy = {

    init() {

        const sections = $$("section[id]");

        const links = $$(".nav-links a");

        if (!sections.length || !links.length) return;

        const activate = throttle(() => {

            let current = "";

            sections.forEach(section => {

                const top = section.offsetTop - 140;

                if (window.scrollY >= top) {

                    current = section.id;

                }

            });

            links.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${current}`) {

                    link.classList.add("active");

                }

            });

        });

        window.addEventListener("scroll", activate);

        activate();

    }

};


/*==================================================
SECTION HELPER
==================================================*/

window.scrollToSection = function (id) {

    const target = document.getElementById(id);

    if (!target) return;

    const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        90;

    window.scrollTo({

        top,

        behavior: "smooth"

    });

};


/*==================================================
INIT PART 2
==================================================*/

SmoothScroll.init();

Header.init();

ScrollSpy.init();
/*==================================================
 KIDSORRA
 PART 3 / 15
 Hero Engine
==================================================*/

const HeroEngine = {

    init() {

        this.parallax();

        this.floating();

        this.mouseGlow();

    },

    /*==========================================
      HERO PARALLAX
    ==========================================*/

    parallax() {

        const hero = document.querySelector(".hero");
        const visual = document.querySelector(".hero-visual");
        const content = document.querySelector(".hero-content");

        if (!hero || !visual) return;

        hero.addEventListener("mousemove", (e) => {

            const rect = hero.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;

            visual.style.transform =
                `translate(${moveX}px,${moveY}px)`;

            if (content) {

                content.style.transform =
                    `translate(${moveX * .35}px,${moveY * .35}px)`;

            }

        });

        hero.addEventListener("mouseleave", () => {

            visual.style.transform = "";

            if (content) {

                content.style.transform = "";

            }

        });

    },

    /*==========================================
      FLOATING ELEMENTS
    ==========================================*/

    floating() {

        const items = document.querySelectorAll(
            ".floating-tag,.star,.magic-circle"
        );

        items.forEach((item, index) => {

            item.animate(

                [

                    {

                        transform: "translateY(0px)"

                    },

                    {

                        transform:
                            `translateY(${-10 - (index * 2)}px)`

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

    },

    /*==========================================
      HERO GLOW
    ==========================================*/

    mouseGlow() {

        const hero = document.querySelector(".hero");

        if (!hero) return;

        const glow = document.createElement("div");

        glow.className = "hero-mouse-glow";

        Object.assign(glow.style, {

            position: "absolute",

            width: "260px",

            height: "260px",

            borderRadius: "50%",

            pointerEvents: "none",

            background:
                "radial-gradient(circle,rgba(255,122,24,.28),transparent 70%)",

            filter: "blur(45px)",

            transform: "translate(-50%,-50%)",

            opacity: ".9",

            transition: "left .08s linear, top .08s linear"

        });

        hero.appendChild(glow);

        hero.addEventListener("mousemove", (e) => {

            const rect = hero.getBoundingClientRect();

            glow.style.left =
                (e.clientX - rect.left) + "px";

            glow.style.top =
                (e.clientY - rect.top) + "px";

        });

    }

};

HeroEngine.init();
/*==================================================
 KIDSORRA
 /* ==========================================
PART 4 — SECTION ANIMATIONS (Kidsorra HTML)
========================================== */

(() => {

const selectors = [

".skill-card",
".future-card",
".difference-item",
".benefit-card",
".growth-box",
".value-card",
".meet-card",
".future-icon",
".growth-wrapper > *",
".philosophy-grid > *",
".skills-timeline .timeline-item",
".stay-card",
".community-grid > *",
".school-grid > *",
".dashboard-grid > *",
".journey-grid > *"

];

const elements = document.querySelectorAll(selectors.join(","));

if (!elements.length) return;

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if (!entry.isIntersecting) return;

const el = entry.target;

el.classList.add("show");

observer.unobserve(el);

});

}, {

threshold: 0.15,

rootMargin: "0px 0px -60px 0px"

});

elements.forEach((el, index) => {

el.style.opacity = "0";

el.style.transform = "translateY(40px)";

el.style.transition =
`opacity .7s ease ${index * 0.05}s,
 transform .7s ease ${index * 0.05}s`;

observer.observe(el);

});

document.addEventListener("DOMContentLoaded", () => {

document.querySelectorAll(".show").forEach((el)=>{

el.style.opacity="1";

el.style.transform="translateY(0)";

});

});

const style = document.createElement("style");

style.textContent = `

.show{
opacity:1!important;
transform:translateY(0)!important;
}

.skill-card:hover,
.future-card:hover,
.difference-item:hover,
.benefit-card:hover,
.value-card:hover,
.meet-card:hover,
.stay-card:hover{

transform:translateY(-10px) scale(1.03)!important;

transition:.35s ease;

}

.growth-box:hover,
.timeline-item:hover,
.school-grid > div:hover,
.dashboard-grid > div:hover,
.community-grid > div:hover,
.philosophy-grid > div:hover,
.journey-grid > div:hover{

transform:translateY(-6px) scale(1.02)!important;

transition:.3s ease;

}

`;

document.head.appendChild(style);

})();

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 5 / 15
==========================================*/

"use strict";

/* =====================================================
   /* ==========================================
PART 5 — FAQ (Kidsorra HTML)
========================================== */

(() => {

const faqItems = document.querySelectorAll(".faq-item");

if (!faqItems.length) return;

faqItems.forEach((item) => {

const question = item.querySelector(".faq-question");
const answer = item.querySelector(".faq-answer");
const icon = question.querySelector("span");

answer.style.maxHeight = "0";
answer.style.overflow = "hidden";
answer.style.transition = "max-height .4s ease";

question.addEventListener("click", () => {

const isOpen = item.classList.contains("active");

faqItems.forEach((faq) => {

faq.classList.remove("active");

faq.querySelector(".faq-answer").style.maxHeight = "0";

const span = faq.querySelector(".faq-question span");

if (span) {

span.textContent = "+";
span.style.transform = "rotate(0deg)";

}

});

if (!isOpen) {

item.classList.add("active");

answer.style.maxHeight = answer.scrollHeight + "px";

if (icon) {

icon.textContent = "−";
icon.style.transform = "rotate(180deg)";
icon.style.transition = "transform .3s ease";

}

}

});

});

})();

/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

(() => {

    const buttons = document.querySelectorAll(

        ".btn-primary,.btn-secondary,.btn-outline,.demo-btn"

    );

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.addEventListener("click", e => {

            const ripple = document.createElement("span");

            const rect = button.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.position = "absolute";
            ripple.style.width = size + "px";
            ripple.style.height = size + "px";
            ripple.style.left =
                (e.clientX - rect.left - size / 2) + "px";
            ripple.style.top =
                (e.clientY - rect.top - size / 2) + "px";

            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,.35)";
            ripple.style.transform = "scale(0)";
            ripple.style.transition = ".6s";
            ripple.style.pointerEvents = "none";

            button.appendChild(ripple);

            requestAnimationFrame(() => {

                ripple.style.transform = "scale(3)";
                ripple.style.opacity = "0";

            });

            setTimeout(() => {

                ripple.remove();

            }, 650);

        });

    });

})();


/* =====================================================
   HERO BUTTON FLOAT
===================================================== */

(() => {

    const heroButtons = document.querySelectorAll(

        ".hero .btn-primary,.hero .btn-secondary"

    );

    heroButtons.forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.style.transform =
                "translateY(-6px)";

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform =
                "";

        });

    });

})();
/* ==========================================
  /* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 6 / 15
==========================================*/

"use strict";

/* =====================================================
   SECTION REVEAL ANIMATION
===================================================== */

(() => {

    const elements = document.querySelectorAll(`

        section,
        .skill-card,
        .future-card,
        .difference-item,
        .benefit-card,
        .growth-box,
        .value-card,
        .meet-card,
        .stay-card,
        .future-box

    `);

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(el => observer.observe(el));

})();


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

(() => {

    const header = document.querySelector("header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader, {

        passive: true

    });

    updateHeader();

})();


/* =====================================================
   AUTO CLOSE MOBILE MENU
===================================================== */

(() => {

    const nav = document.querySelector(".nav-links");

    const overlay = document.querySelector(".mobile-menu-overlay");

    const links = document.querySelectorAll(".nav-links a");

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("click", () => {

            nav?.classList.remove("active");

            overlay?.classList.remove("active");

        });

    });

})();


/* =====================================================
   HERO BUTTON MICRO ANIMATION
===================================================== */

(() => {

    const buttons = document.querySelectorAll(

        ".hero .btn-primary, .hero .btn-secondary"

    );

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.animate(

                [

                    {

                        transform: "translateY(0)"

                    },

                    {

                        transform: "translateY(-6px)"

                    }

                ],

                {

                    duration: 180,

                    fill: "forwards",

                    easing: "ease-out"

                }

            );

        });

        button.addEventListener("mouseleave", () => {

            button.animate(

                [

                    {

                        transform: "translateY(-6px)"

                    },

                    {

                        transform: "translateY(0)"

                    }

                ],

                {

                    duration: 180,

                    fill: "forwards",

                    easing: "ease-out"

                }

            );

        });

    });

})();


/* =====================================================
   SAFE SCROLL FUNCTION
===================================================== */

window.scrollToSection = function(selector) {

    const target = document.querySelector(selector);

    if (!target) return;

    const offset = 90;

    const top =

        target.getBoundingClientRect().top +

        window.pageYOffset -

        offset;

    window.scrollTo({

        top,

        behavior: "smooth"

    });

};


/* =====================================================
   ENGINE STATUS
===================================================== */

window.Kidsorra = window.Kidsorra || {};

Kidsorra.version = "1.0.0";

console.log(

    "%cKidsorra Engine Part 6 Ready",

    "color:#35C759;font-size:15px;font-weight:bold;"

);

/* ==========================================
   /* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 7 / 15
==========================================*/

"use strict";

/* =====================================================
   PREMIUM COUNTERS
===================================================== */

(() => {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const animateCounter = (el) => {

        const target = Number(el.dataset.target || 0);

        const duration = 1800;

        const startTime = performance.now();

        function update(now) {

            const progress = Math.min((now - startTime) / duration, 1);

            const value = Math.floor(progress * target);

            el.textContent = value.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                el.textContent = target.toLocaleString();

            }

        }

        requestAnimationFrame(update);

    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.35

    });

    counters.forEach(counter => observer.observe(counter));

})();


/* =====================================================
   STATS HOVER EFFECT
===================================================== */

(() => {

    const cards = document.querySelectorAll(".stat");

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

})();


/* =====================================================
   NUMBER FORMATTER
===================================================== */

window.KidsorraNumber = {

    format(value) {

        return Number(value).toLocaleString();

    },

    percent(value) {

        return `${value}%`;

    }

};


/* =====================================================
   HERO BADGE FLOAT
===================================================== */

(() => {

    const badge = document.querySelector(".badge");

    if (!badge) return;

    badge.animate(

        [

            { transform: "translateY(0px)" },

            { transform: "translateY(-6px)" },

            { transform: "translateY(0px)" }

        ],

        {

            duration: 2600,

            easing: "ease-in-out",

            iterations: Infinity

        }

    );

})();


/* =====================================================
   SECTION TITLE REVEAL
===================================================== */

(() => {

    const titles = document.querySelectorAll(".section-title");

    if (!titles.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateY(30px)"

                    },

                    {

                        opacity: 1,

                        transform: "translateY(0)"

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

    }, {

        threshold: 0.2

    });

    titles.forEach(title => observer.observe(title));

})();


console.log(

    "%cKidsorra Engine Part 7 Ready",

    "color:#FFD166;font-weight:bold;font-size:14px;"

);
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 8 / 15
==========================================*/

"use strict";

/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

(() => {

    const slider = document.querySelector(".testimonial-slider");
    const items = document.querySelectorAll(".testimonial");

    if (!slider || items.length <= 1) return;

    let current = 0;

    function showSlide(index) {

        items.forEach((item, i) => {

            item.classList.toggle("active", i === index);

        });

    }

    function nextSlide() {

        current++;

        if (current >= items.length) {

            current = 0;

        }

        showSlide(current);

    }

    showSlide(current);

    setInterval(nextSlide, 6000);

})();


/* =====================================================
   TESTIMONIAL DOTS
===================================================== */

(() => {

    const slider = document.querySelector(".testimonial-slider");
    const items = document.querySelectorAll(".testimonial");

    if (!slider || items.length <= 1) return;

    const dots = document.createElement("div");
    dots.className = "testimonial-dots";

    items.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.className = "testimonial-dot";

        if (index === 0) {

            dot.classList.add("active");

        }

        dot.addEventListener("click", () => {

            document.querySelectorAll(".testimonial").forEach((item, i) => {

                item.classList.toggle("active", i === index);

            });

            document.querySelectorAll(".testimonial-dot").forEach((d, i) => {

                d.classList.toggle("active", i === index);

            });

        });

        dots.appendChild(dot);

    });

    slider.appendChild(dots);

})();


/* =====================================================
   BUTTON CLICK SCALE
===================================================== */

(() => {

    document.querySelectorAll(

        ".btn,.btn-primary,.btn-secondary"

    ).forEach(button => {

        button.addEventListener("mousedown", () => {

            button.style.transform = "scale(.96)";

        });

        button.addEventListener("mouseup", () => {

            button.style.transform = "";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

})();


/* =====================================================
   HERO SCROLL INDICATOR
===================================================== */

(() => {

    const indicator = document.querySelector(".scroll-indicator");

    if (!indicator) return;

    indicator.addEventListener("click", () => {

        const nextSection = document.querySelector("section");

        if (!nextSection) return;

        nextSection.scrollIntoView({

            behavior: "smooth"

        });

    });

})();


/* =====================================================
   SECTION BACKGROUND PARALLAX
===================================================== */

(() => {

    const sections = document.querySelectorAll(".parallax-section");

    if (!sections.length) return;

    window.addEventListener("scroll", () => {

        const scroll = window.pageYOffset;

        sections.forEach(section => {

            section.style.backgroundPositionY =
                (scroll * 0.25) + "px";

        });

    });

})();


console.log(
    "%cKidsorra Engine Part 8 Ready",
    "color:#35C759;font-weight:bold;"
);

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 9 / 15
==========================================*/

"use strict";

/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

(() => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", e => {

        e.preventDefault();

        let valid = true;

        form.querySelectorAll("input,textarea,select")
        .forEach(field => {

            field.classList.remove("error");

            if (field.hasAttribute("required")) {

                if (field.value.trim() === "") {

                    valid = false;
                    field.classList.add("error");

                }

            }

            if (field.type === "email") {

                if (!emailPattern.test(field.value.trim())) {

                    valid = false;
                    field.classList.add("error");

                }

            }

        });

        if (!valid) {

            if (window.Toast) {

                Toast.show(
                    "Please complete all required fields.",
                    "#ff4d4f"
                );

            }

            return;

        }

        const button = form.querySelector("button");

        if (button) {

            const original = button.innerHTML;

            button.disabled = true;
            button.innerHTML = "Sending...";

            setTimeout(() => {

                button.innerHTML = "✓ Message Sent";

                if (window.Toast) {

                    Toast.show(
                        "Thank you! We will contact you soon.",
                        "#35C759"
                    );

                }

                form.reset();

                setTimeout(() => {

                    button.disabled = false;
                    button.innerHTML = original;

                }, 2500);

            }, 1200);

        }

    });

})();


/* =====================================================
   INPUT ANIMATION
===================================================== */

(() => {

    document.querySelectorAll(

        ".contact-form input,.contact-form textarea,.contact-form select"

    ).forEach(field => {

        field.addEventListener("focus", () => {

            field.classList.add("focused");

        });

        field.addEventListener("blur", () => {

            if (field.value.trim() === "") {

                field.classList.remove("focused");

            }

        });

    });

})();


/* =====================================================
   COPY PHONE NUMBER
===================================================== */

(() => {

    const phone = document.querySelector("[data-copy-phone]");

    if (!phone) return;

    phone.addEventListener("click", () => {

        navigator.clipboard.writeText(phone.dataset.copyPhone);

        if (window.Toast) {

            Toast.show(

                "Phone number copied.",

                "#6C63FF"

            );

        }

    });

})();


/* =====================================================
   COPY EMAIL
===================================================== */

(() => {

    const email = document.querySelector("[data-copy-email]");

    if (!email) return;

    email.addEventListener("click", () => {

        navigator.clipboard.writeText(email.dataset.copyEmail);

        if (window.Toast) {

            Toast.show(

                "Email copied.",

                "#6C63FF"

            );

        }

    });

})();


/* =====================================================
   CONTACT CARD HOVER
===================================================== */

(() => {

    document.querySelectorAll(".contact-card")

    .forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =

                "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

})();


console.log(

    "%cKidsorra Engine Part 9 Ready",

    "color:#6C63FF;font-weight:bold;"

);

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 10 / 15
==========================================*/

"use strict";

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

(() => {

    const progress = document.querySelector(".scroll-progress");

    if (!progress) return;

    function updateProgress() {

        const scrollTop = window.pageYOffset;

        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percent = (scrollTop / docHeight) * 100;

        progress.style.width = percent + "%";

    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();

})();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

(() => {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-links a");

    if (!sections.length || !navLinks.length) return;

    function updateNavigation() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (
                window.pageYOffset >= top &&
                window.pageYOffset < top + height
            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateNavigation, {
        passive: true
    });

    updateNavigation();

})();


/* =====================================================
   CARD STAGGER REVEAL
===================================================== */

(() => {

    const groups = document.querySelectorAll(

        ".program-grid,.school-grid,.trust-grid,.testimonial-grid"

    );

    if (!groups.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            [...entry.target.children].forEach((item, index) => {

                item.animate(

                    [

                        {

                            opacity: 0,

                            transform: "translateY(40px)"

                        },

                        {

                            opacity: 1,

                            transform: "translateY(0)"

                        }

                    ],

                    {

                        duration: 650,

                        delay: index * 120,

                        easing: "ease-out",

                        fill: "forwards"

                    }

                );

            });

            observer.unobserve(entry.target);

        });

    }, {

        threshold: .15

    });

    groups.forEach(group => observer.observe(group));

})();


/* =====================================================
   HERO SCROLL INDICATOR
===================================================== */

(() => {

    const indicator = document.querySelector(".scroll-indicator");

    if (!indicator) return;

    indicator.addEventListener("click", () => {

        const next = document.querySelector("main section");

        if (!next) return;

        next.scrollIntoView({

            behavior: "smooth"

        });

    });

})();


/* =====================================================
   SECTION PARALLAX BACKGROUND
===================================================== */

(() => {

    const parallax = document.querySelectorAll(".parallax-section");

    if (!parallax.length) return;

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        parallax.forEach(section => {

            section.style.backgroundPositionY =
                `${offset * 0.18}px`;

        });

    }, {

        passive: true

    });

})();


/* =====================================================
   SAFE INITIALIZER
===================================================== */

window.Kidsorra = window.Kidsorra || {};

Kidsorra.version = "1.0.0";

console.log(
    "%cKidsorra Engine Part 10 Ready",
    "color:#35C759;font-size:15px;font-weight:bold;"
);

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

        ".gallery img,\
.program-card img,\
.school-card img,\
.image-card img"

    );


    if (!images.length) return;


    const overlay = document.createElement("div");

    overlay.className = "kidsorra-lightbox";


    Object.assign(overlay.style, {

        position: "fixed",

        inset: "0",

        background: "rgba(0,0,0,.88)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        opacity: "0",

        visibility: "hidden",

        transition: ".35s ease",

        zIndex: "999999"

    });



    const preview = document.createElement("img");


    Object.assign(preview.style, {

        maxWidth: "90%",

        maxHeight: "85vh",

        borderRadius: "24px",

        objectFit: "contain",

        transform: "scale(.85)",

        transition: ".35s ease",

        boxShadow:
        "0 25px 80px rgba(0,0,0,.35)"

    });



    overlay.appendChild(preview);

    document.body.appendChild(overlay);



    images.forEach(img => {


        img.style.cursor = "zoom-in";


        img.addEventListener("click", () => {


            preview.src = img.currentSrc || img.src;


            overlay.style.opacity = "1";

            overlay.style.visibility = "visible";


            preview.style.transform = "scale(1)";


            document.body.style.overflow = "hidden";


        });


    });



    function closeLightbox(){

        overlay.style.opacity = "0";

        overlay.style.visibility = "hidden";

        preview.style.transform = "scale(.85)";

        document.body.style.overflow = "";

    }



    overlay.addEventListener(

        "click",

        closeLightbox

    );



    document.addEventListener(

        "keydown",

        e => {

            if(e.key === "Escape"){

                closeLightbox();

            }

        }

    );


})();



/* =====================================================
   IMAGE HOVER MICRO ANIMATION
===================================================== */

(() => {


    const images = document.querySelectorAll(

        ".gallery img,\
.program-card img,\
.school-card img"

    );


    images.forEach(img => {


        img.addEventListener(

            "mouseenter",

            () => {

                img.style.transform =
                "scale(1.04)";

            }

        );



        img.addEventListener(

            "mouseleave",

            () => {

                img.style.transform =
                "";

            }

        );


    });


})();



/* =====================================================
   IMAGE LOADING FADE
===================================================== */

(() => {


    const images = document.querySelectorAll("img");


    images.forEach(img => {


        img.addEventListener(

            "load",

            () => {

                img.classList.add(

                    "image-loaded"

                );

            }

        );


    });


})();



/* =====================================================
   GALLERY COUNTER
===================================================== */

(() => {


    const galleries = document.querySelectorAll(

        "[data-gallery-count]"

    );


    galleries.forEach(item => {


        const count =

            item.querySelector(".gallery-count");


        const images =

            item.querySelectorAll("img").length;



        if(count){

            count.textContent = images;

        }


    });


})();



/* =====================================================
   ENGINE STATUS
===================================================== */


console.log(

    "%cKidsorra Engine Part 11 Ready",

    "color:#ff7a18;font-size:15px;font-weight:bold;"

);

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



    function createPiece(){


        const piece = document.createElement("span");


        const size =

            Math.random() * 10 + 6;



        Object.assign(piece.style, {

            position:"fixed",

            top:"-20px",

            left:
            Math.random() * 100 + "vw",

            width:size + "px",

            height:size * 1.4 + "px",

            background:

            colors[
                Math.floor(
                    Math.random()*colors.length
                )
            ],

            borderRadius:"4px",

            pointerEvents:"none",

            zIndex:"999999"

        });



        document.body.appendChild(piece);



        const duration =

            Math.random()*2000 + 2500;



        piece.animate(

            [

                {

                    transform:
                    "translateY(0) rotate(0)",

                    opacity:1

                },

                {

                    transform:
                    `translateY(110vh)
                    rotate(${720}deg)`,

                    opacity:0

                }

            ],

            {

                duration,

                easing:"linear"

            }

        );



        setTimeout(()=>{

            piece.remove();

        }, duration);



    }



    function burst(amount = 80){


        for(let i=0;i<amount;i++){


            setTimeout(()=>{

                createPiece();

            }, i * 15);


        }


    }



    return {

        burst

    };


})();




/* =====================================================
   GLOBAL CELEBRATION FUNCTION
===================================================== */

window.kidsorraCelebrate = function(){

    KidsorraConfetti.burst(120);

};




/* =====================================================
   SUCCESS BUTTON ACTION
===================================================== */

(() => {


    const buttons = document.querySelectorAll(

        ".celebrate-button,\
.success-button,\
.demo-success"

    );



    buttons.forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                KidsorraConfetti.burst(90);


                button.animate(

                    [

                        {

                            transform:"scale(1)"

                        },

                        {

                            transform:"scale(1.08)"

                        },

                        {

                            transform:"scale(1)"

                        }

                    ],

                    {

                        duration:450,

                        easing:"ease"

                    }

                );


            }

        );


    });


})();




/* =====================================================
   FLOATING EMOJI EFFECT
===================================================== */

window.showKidsorraEmoji = function(){


    const emojis = [

        "🌈",

        "⭐",

        "✨",

        "🎈",

        "🚀",

        "🦄"

    ];



    const emoji = document.createElement("div");



    emoji.textContent =

        emojis[
            Math.floor(
                Math.random()*emojis.length
            )
        ];



    Object.assign(emoji.style, {

        position:"fixed",

        left:
        Math.random()*90+"vw",

        bottom:"20px",

        fontSize:"32px",

        zIndex:"99999",

        pointerEvents:"none"

    });



    document.body.appendChild(emoji);



    emoji.animate(

        [

            {

                transform:"translateY(0)",

                opacity:1

            },

            {

                transform:
                "translateY(-280px)",

                opacity:0

            }

        ],

        {

            duration:2500,

            easing:"ease-out"

        }

    );



    setTimeout(()=>{

        emoji.remove();

    },2500);


};




/* =====================================================
   MAGIC MESSAGE
===================================================== */

window.showKidsorraMessage = function(){


    const messages = [

        "Dream Big ✨",

        "Keep Learning 🌈",

        "You Can Do It 🚀",

        "Future Starts Here ⭐",

        "Learning Is Fun 🎨"

    ];



    const message =

        messages[
            Math.floor(
                Math.random()*messages.length
            )
        ];



    if(window.Toast){

        Toast.show(

            message,

            "#6C63FF"

        );

    }


};




/* =====================================================
   ENGINE STATUS
===================================================== */

console.log(

    "%cKidsorra Engine Part 12 Ready",

    "color:#FFD166;font-size:15px;font-weight:bold;"

);

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 13 / 15
==========================================*/

"use strict";


/* =====================================================
   PREMIUM CURSOR EFFECT
===================================================== */

(() => {


    if (window.innerWidth < 768) return;


    const cursor = document.createElement("div");


    cursor.className = "kidsorra-cursor";


    Object.assign(cursor.style, {

        position:"fixed",

        width:"18px",

        height:"18px",

        borderRadius:"50%",

        background:"#ff7a18",

        pointerEvents:"none",

        zIndex:"999999",

        transform:"translate(-50%,-50%)",

        transition:
        "width .25s ease,height .25s ease,opacity .25s ease",

        opacity:"0.8"

    });



    document.body.appendChild(cursor);



    window.addEventListener(

        "mousemove",

        e=>{

            cursor.style.left =
                e.clientX+"px";

            cursor.style.top =
                e.clientY+"px";

        }

    );



    document.querySelectorAll(

        "a,button,.card,.program-card,.school-card"

    )

    .forEach(element=>{


        element.addEventListener(

            "mouseenter",

            ()=>{

                cursor.style.width="45px";

                cursor.style.height="45px";

                cursor.style.opacity=".35";

            }

        );



        element.addEventListener(

            "mouseleave",

            ()=>{

                cursor.style.width="18px";

                cursor.style.height="18px";

                cursor.style.opacity=".8";

            }

        );


    });


})();




/* =====================================================
   CARD SHINE EFFECT
===================================================== */

(() => {


    const cards = document.querySelectorAll(

        ".program-card,\
.school-card,\
.trust-card,\
.lifeskill-card"

    );



    if(!cards.length) return;



    cards.forEach(card=>{


        card.addEventListener(

            "mousemove",

            e=>{


                const rect =
                    card.getBoundingClientRect();



                const x =
                    e.clientX - rect.left;



                const y =
                    e.clientY - rect.top;



                card.style.background =

                `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255,255,255,.9),
                    #ffffff 45%
                )`;



            }

        );



        card.addEventListener(

            "mouseleave",

            ()=>{


                card.style.background="";


            }

        );


    });


})();




/* =====================================================
   CARD HOVER LIFT
===================================================== */

(() => {


    const elements = document.querySelectorAll(

        ".card,\
.program-card,\
.school-card,\
.testimonial"

    );



    elements.forEach(item=>{


        item.addEventListener(

            "mouseenter",

            ()=>{

                item.style.transform =
                "translateY(-10px)";

            }

        );



        item.addEventListener(

            "mouseleave",

            ()=>{

                item.style.transform="";

            }

        );


    });


})();




/* =====================================================
   LINK UNDERLINE ANIMATION
===================================================== */

(() => {


    document.querySelectorAll(

        ".nav-links a"

    )

    .forEach(link=>{


        link.addEventListener(

            "mouseenter",

            ()=>{

                link.style.transition=".3s";

                link.style.transform =
                "translateY(-2px)";

            }

        );



        link.addEventListener(

            "mouseleave",

            ()=>{

                link.style.transform="";

            }

        );


    });


})();




/* =====================================================
   RANDOM MAGIC SPARK
===================================================== */

(() => {


    function createSpark(){


        const spark =
            document.createElement("span");



        Object.assign(spark.style,{

            position:"fixed",

            width:"6px",

            height:"6px",

            borderRadius:"50%",

            background:"#FFD166",

            left:
            Math.random()*100+"vw",

            top:
            Math.random()*100+"vh",

            pointerEvents:"none",

            zIndex:"99999"

        });



        document.body.appendChild(spark);



        spark.animate(

            [

                {

                    transform:"scale(1)",

                    opacity:1

                },

                {

                    transform:"scale(0)",

                    opacity:0

                }

            ],

            {

                duration:1200,

                easing:"ease-out"

            }

        );



        setTimeout(()=>{

            spark.remove();

        },1200);


    }



    setInterval(

        createSpark,

        4000

    );


})();




/* =====================================================
   ENGINE STATUS
===================================================== */


console.log(

    "%cKidsorra Engine Part 13 Ready",

    "color:#6C63FF;font-size:15px;font-weight:bold;"

);

/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 14 / 15
==========================================*/

"use strict";


/* =====================================================
   CENTRAL ANIMATION CONTROLLER
===================================================== */

const KidsorraAnimation = {


    reveal(element, options = {}){


        if(!element) return;


        const {

            delay = 0,

            duration = 700,

            distance = 35

        } = options;



        element.animate(

            [

                {

                    opacity:0,

                    transform:
                    `translateY(${distance}px)`

                },

                {

                    opacity:1,

                    transform:
                    "translateY(0)"

                }

            ],

            {

                duration,

                delay,

                easing:"ease-out",

                fill:"forwards"

            }

        );


    },



    pulse(element){


        if(!element) return;


        element.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(1.05)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:500,

                easing:"ease"

            }

        );


    }


};



window.KidsorraAnimation = KidsorraAnimation;




/* =====================================================
   SMART REVEAL OBSERVER
===================================================== */

(() => {


    const items = document.querySelectorAll(

        ".fade-element,\
.program-card,\
.school-card,\
.trust-card,\
.testimonial,\
.journey-step,\
.lifeskill-card"

    );



    if(!items.length) return;



    const observer = new IntersectionObserver(

        entries=>{


            entries.forEach(entry=>{


                if(!entry.isIntersecting) return;



                KidsorraAnimation.reveal(

                    entry.target,

                    {

                        duration:750

                    }

                );



                observer.unobserve(

                    entry.target

                );


            });


        },

        {

            threshold:.15

        }

    );



    items.forEach(item=>{


        observer.observe(item);


    });



})();




/* =====================================================
   HERO AUTO MOTION
===================================================== */

(() => {


    const heroVisual =
        document.querySelector(".hero-visual");



    if(!heroVisual) return;



    heroVisual.animate(

        [

            {

                transform:
                "translateY(0)"

            },

            {

                transform:
                "translateY(-12px)"

            },

            {

                transform:
                "translateY(0)"

            }

        ],

        {

            duration:4500,

            iterations:Infinity,

            easing:"ease-in-out"

        }

    );


})();




/* =====================================================
   PERFORMANCE MODE
===================================================== */

(() => {


    let timer;



    function optimize(){


        document.body.classList.add(

            "performance-mode"

        );



        clearTimeout(timer);



        timer=setTimeout(()=>{


            document.body.classList.remove(

                "performance-mode"

            );


        },500);


    }



    window.addEventListener(

        "scroll",

        optimize,

        {

            passive:true

        }

    );



})();




/* =====================================================
   REDUCE MOTION SUPPORT
===================================================== */

(() => {


    const reduceMotion =

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        );



    function apply(){


        if(reduceMotion.matches){


            document.body.classList.add(

                "reduce-motion"

            );


        }


    }



    apply();



    reduceMotion.addEventListener(

        "change",

        apply

    );



})();




/* =====================================================
   WINDOW LOAD FINAL CHECK
===================================================== */

window.addEventListener(

    "load",

    ()=>{


        document.body.classList.add(

            "kidsorra-ready"

        );



        console.log(

            "%cKidsorra UI Fully Initialized",

            "color:#35C759;font-size:16px;font-weight:bold;"

        );


    }

);




/* =====================================================
   END PART 14
=====================================================*/
/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 15 / 15
   FINAL PRODUCTION BUILD
==========================================*/

"use strict";


/* =====================================================
   GLOBAL ERROR PROTECTION
===================================================== */

window.addEventListener(
    "error",
    (event)=>{

        console.warn(
            "[Kidsorra Error]",
            event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    (event)=>{

        console.warn(
            "[Kidsorra Promise Error]",
            event.reason
        );

    }
);



/* =====================================================
   DEVICE INFORMATION
===================================================== */

window.KidsorraDevice = {


    isMobile(){

        return window.innerWidth < 768;

    },


    isTablet(){

        return (
            window.innerWidth >= 768 &&
            window.innerWidth < 1100
        );

    },


    isDesktop(){

        return window.innerWidth >= 1100;

    }


};




/* =====================================================
   GLOBAL HELPERS
===================================================== */

window.KidsorraHelpers = {


    random(min,max){

        return Math.floor(

            Math.random() *
            (max-min+1)

        ) + min;

    },


    sleep(ms){

        return new Promise(resolve=>{

            setTimeout(resolve,ms);

        });

    },


    id(){

        return (

            "kidsorra-" +

            Math.random()
            .toString(36)
            .substring(2,10)

        );

    }


};




/* =====================================================
   IMAGE PRELOAD ENGINE
===================================================== */

(() => {


    const images = [

        ...document.images

    ];



    images.forEach(img=>{


        if(img.complete) return;



        const preload = new Image();



        preload.src = img.src;



    });



})();




/* =====================================================
   CLEAN TEMP ELEMENTS
===================================================== */

(() => {


    function cleanup(){


        document.querySelectorAll(

            ".kidsorra-temp,\
.hero-particles span,\
.magic-cursor,\
.cursor-glow"

        )

        .forEach(element=>{


            if(
                !document.body.contains(element)
            ){

                element.remove();

            }


        });


    }



    setInterval(

        cleanup,

        20000

    );


})();




/* =====================================================
   VISIBILITY OPTIMIZATION
===================================================== */

(() => {


    document.addEventListener(

        "visibilitychange",

        ()=>{


            if(document.hidden){


                document.body.classList.add(

                    "page-hidden"

                );


            }

            else{


                document.body.classList.remove(

                    "page-hidden"

                );


            }


        }

    );


})();




/* =====================================================
   FINAL PAGE READY
===================================================== */

window.addEventListener(

    "load",

    ()=>{


        document.documentElement.classList.add(

            "kidsorra-loaded"

        );



        console.log(

            "%cKIDSORRA PREMIUM WEBSITE READY",

            "color:#ff7a18;font-size:20px;font-weight:bold;"

        );


    }

);




/* =====================================================
   MODULE STATUS
===================================================== */

(() => {


    const modules = [

        "Navigation",

        "Hero",

        "Cards",

        "Animations",

        "FAQ",

        "Forms",

        "Gallery",

        "Performance"

    ];



    modules.forEach(module=>{


        console.log(

            "✓ " + module + " initialized"

        );


    });


})();



/* =====================================================
   END OF KIDSORRA SCRIPT ENGINE
=====================================================*/

