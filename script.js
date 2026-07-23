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
   BUTTON CLICK EFFECT
===================================================== */

(() => {

    const buttons = document.querySelectorAll(

        ".btn-primary, .btn-secondary, .demo-btn"

    );

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener("pointerdown", () => {

            button.style.transform = "scale(.96)";

        });

        const reset = () => {

            button.style.transform = "";

        };

        button.addEventListener("pointerup", reset);

        button.addEventListener("pointerleave", reset);

        button.addEventListener("pointercancel", reset);

    });

})();


/* =====================================================
   HERO FLOATING TAGS
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

                    transform: "translateY(-8px)"

                },

                {

                    transform: "translateY(0px)"

                }

            ],

            {

                duration: 2500 + (index * 250),

                easing: "ease-in-out",

                iterations: Infinity

            }

        );

    });

})();


/* =====================================================
   FEATURE ITEMS ANIMATION
===================================================== */

(() => {

    const items = document.querySelectorAll(".feature-item");

    if (!items.length) return;

    items.forEach((item, index) => {

        item.animate(

            [

                {

                    opacity: .7,

                    transform: "translateY(0)"

                },

                {

                    opacity: 1,

                    transform: "translateY(-4px)"

                },

                {

                    opacity: .7,

                    transform: "translateY(0)"

                }

            ],

            {

                duration: 2200 + (index * 180),

                iterations: Infinity,

                easing: "ease-in-out"

            }

        );

    });

})();


/* =====================================================
   MAGIC STAR PARALLAX
===================================================== */

(() => {

    const stars = document.querySelectorAll(".star");

    if (!stars.length) return;

    window.addEventListener("scroll", () => {

        const scroll = window.pageYOffset;

        stars.forEach((star, index) => {

            const speed = (index + 1) * 0.03;

            star.style.transform =

                `translateY(${scroll * speed}px)`;

        });

    }, {

        passive: true

    });

})();


/* =====================================================
   MAGIC CIRCLE PULSE
===================================================== */

(() => {

    const circle = document.querySelector(".magic-circle");

    if (!circle) return;

    circle.animate(

        [

            {

                transform: "scale(1)",

                opacity: .9

            },

            {

                transform: "scale(1.08)",

                opacity: 1

            },

            {

                transform: "scale(1)",

                opacity: .9

            }

        ],

        {

            duration: 3000,

            iterations: Infinity,

            easing: "ease-in-out"

        }

    );

})();


console.log(

    "%cKidsorra Engine Part 8 Ready",

    "color:#35C759;font-weight:bold;font-size:15px;"

);



/* ==========================================
   KIDSORRA
   SCRIPT.JS
   PART 9 / 15
==========================================*/



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

        const percent = Math.max(
            0,
            Math.min((scrollTop / docHeight) * 100, 100)
        );

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

            const bottom = top + section.offsetHeight;

            if (

                window.pageYOffset >= top &&
                window.pageYOffset < bottom

            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

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
   PREMIUM STAGGER REVEAL
===================================================== */

(() => {

    const groups = document.querySelectorAll(

        ".skills-grid," +
        ".future-grid," +
        ".difference-grid," +
        ".benefits-grid," +
        ".growth-wrapper," +
        ".values-grid," +
        ".meet-grid," +
        ".journey-grid," +
        ".dashboard-grid," +
        ".community-grid," +
        ".school-grid," +
        ".stay-grid"

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

                        delay: index * 100,

                        easing: "ease-out",

                        fill: "forwards"

                    }

                );

            });

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.15

    });

    groups.forEach(group => observer.observe(group));

})();


/* =====================================================
   PREMIUM CTA BUTTON EFFECT
===================================================== */

(() => {

    const ctaButtons = document.querySelectorAll(

        ".premium-cta .btn-primary," +
        ".final-cta .btn-primary"

    );

    if (!ctaButtons.length) return;

    ctaButtons.forEach(button => {

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

                    easing: "ease-out",

                    fill: "forwards"

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

                    easing: "ease-out",

                    fill: "forwards"

                }

            );

        });

    });

})();


/* =====================================================
   ENGINE STATUS
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
   IMAGE LOADING FADE
===================================================== */

(() => {

    const images = document.querySelectorAll("img");

    if (!images.length) return;

    images.forEach(img => {

        if (img.complete) {

            img.classList.add("image-loaded");

        } else {

            img.addEventListener("load", () => {

                img.classList.add("image-loaded");

            });

        }

    });

})();


/* =====================================================
   IMAGE ERROR FALLBACK
===================================================== */

(() => {

    const images = document.querySelectorAll("img");

    if (!images.length) return;

    images.forEach(img => {

        img.addEventListener("error", () => {

            img.classList.add("image-error");

            img.alt = "Image unavailable";

        });

    });

})();


/* =====================================================
   IMAGE MICRO HOVER EFFECT
===================================================== */

(() => {

    const images = document.querySelectorAll("img");

    if (!images.length) return;

    images.forEach(img => {

        img.style.transition =
            "transform .35s ease, filter .35s ease";

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.03)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "";

        });

    });

})();


/* =====================================================
   IMAGE PERFORMANCE
===================================================== */

(() => {

    const images = document.querySelectorAll("img");

    if (!images.length) return;

    images.forEach(img => {

        img.loading = "lazy";

        img.decoding = "async";

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
   HTML OPTIMIZED
==========================================*/

"use strict";

/* =====================================================
   PREMIUM CTA BUTTONS
===================================================== */

(() => {

    const buttons = document.querySelectorAll(

        ".btn-primary, .demo-btn"

    );

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.animate(

                [

                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(1.05)"
                    },

                    {
                        transform: "scale(1)"
                    }

                ],

                {

                    duration: 300,

                    easing: "ease-out"

                }

            );

        });

    });

})();


/* =====================================================
   HERO BADGE PULSE
===================================================== */

(() => {

    const badge = document.querySelector(".hero .badge");

    if (!badge) return;

    badge.animate(

        [

            {
                transform: "scale(1)"
            },

            {
                transform: "scale(1.04)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {

            duration: 2600,

            iterations: Infinity,

            easing: "ease-in-out"

        }

    );

})();


/* =====================================================
   SECTION TITLE DECORATION
===================================================== */

(() => {

    const titles = document.querySelectorAll(".section-title span");

    if (!titles.length) return;

    titles.forEach((title, index) => {

        title.animate(

            [

                {
                    opacity: .7
                },

                {
                    opacity: 1
                },

                {
                    opacity: .7
                }

            ],

            {

                duration: 2400 + (index * 120),

                iterations: Infinity,

                easing: "ease-in-out"

            }

        );

    });

})();


/* =====================================================
   HERO FEATURES STAGGER
===================================================== */

(() => {

    const items = document.querySelectorAll(".feature-item");

    if (!items.length) return;

    items.forEach((item, index) => {

        item.style.animationDelay = `${index * .15}s`;

        item.classList.add("feature-ready");

    });

})();


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

(() => {

    const links = document.querySelectorAll(

        'a[href^="#"]'

    );

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(

                link.getAttribute("href")

            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

})();


/* =====================================================
   HERO VISUAL TILT
===================================================== */

(() => {

    const visual = document.querySelector(".hero-visual");

    if (!visual) return;

    visual.addEventListener("mousemove", e => {

        const rect = visual.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - .5;

        const y = (e.clientY - rect.top) / rect.height - .5;

        visual.style.transform =

            `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;

    });

    visual.addEventListener("mouseleave", () => {

        visual.style.transform = "";

    });

})();


/* =====================================================
   PREMIUM SCROLL HINT
===================================================== */

(() => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 120) {

                hero.classList.add("hero-scrolled");

            } else {

                hero.classList.remove("hero-scrolled");

            }

        },

        {

            passive: true

        }

    );

})();


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
   HTML OPTIMIZED
==========================================*/

"use strict";

/* =====================================================
   PREMIUM CURSOR
===================================================== */

(() => {

    if (window.innerWidth < 992) return;

    const cursor = document.createElement("div");

    cursor.className = "kidsorra-cursor";

    Object.assign(cursor.style, {

        position: "fixed",

        width: "16px",

        height: "16px",

        borderRadius: "50%",

        background: "#FF7A18",

        pointerEvents: "none",

        zIndex: "999999",

        left: "0",

        top: "0",

        transform: "translate(-50%,-50%)",

        transition:
            "width .25s ease,height .25s ease,opacity .25s ease",

        opacity: ".75"

    });

    document.body.appendChild(cursor);

    window.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";

        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll(

        "a,button,.skill-card,.future-card,.difference-item,.benefit-card,.growth-box,.value-card,.meet-card"

    ).forEach(el => {

        el.addEventListener("mouseenter", () => {

            cursor.style.width = "42px";

            cursor.style.height = "42px";

            cursor.style.opacity = ".30";

        });

        el.addEventListener("mouseleave", () => {

            cursor.style.width = "16px";

            cursor.style.height = "16px";

            cursor.style.opacity = ".75";

        });

    });

})();


/* =====================================================
   CARD MICRO LIFT
===================================================== */

(() => {

    const cards = document.querySelectorAll(

        ".skill-card,.future-card,.difference-item,.benefit-card,.growth-box,.value-card,.meet-card"

    );

    if (!cards.length) return;

    cards.forEach(card => {

        card.style.transition =
            "transform .28s ease, box-shadow .28s ease";

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

})();


/* =====================================================
   NAV LINK HOVER
===================================================== */

(() => {

    const links = document.querySelectorAll(".nav-links a");

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("mouseenter", () => {

            link.style.transform = "translateY(-2px)";

            link.style.transition = ".25s ease";

        });

        link.addEventListener("mouseleave", () => {

            link.style.transform = "";

        });

    });

})();


/* =====================================================
   FLOATING MAGIC SPARK
===================================================== */

(() => {

    function createSpark() {

        const spark = document.createElement("span");

        Object.assign(spark.style, {

            position: "fixed",

            width: "6px",

            height: "6px",

            borderRadius: "50%",

            background: "#FFD166",

            left: Math.random() * 100 + "vw",

            top: Math.random() * 100 + "vh",

            opacity: ".9",

            pointerEvents: "none",

            zIndex: "99999"

        });

        document.body.appendChild(spark);

        spark.animate(

            [

                {

                    transform: "scale(1)",

                    opacity: 1

                },

                {

                    transform: "scale(0)",

                    opacity: 0

                }

            ],

            {

                duration: 1400,

                easing: "ease-out"

            }

        );

        setTimeout(() => spark.remove(), 1400);

    }

    setInterval(createSpark, 5000);

})();


/* =====================================================
   HERO FEATURE HOVER
===================================================== */

(() => {

    const features = document.querySelectorAll(".feature-item");

    if (!features.length) return;

    features.forEach(item => {

        item.style.transition = "transform .25s ease";

        item.addEventListener("mouseenter", () => {

            item.style.transform = "translateY(-4px)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "";

        });

    });

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
   HTML OPTIMIZED
==========================================*/

"use strict";

/* =====================================================
   GLOBAL REVEAL ENGINE
===================================================== */

window.KidsorraAnimation = {

    reveal(element, options = {}) {

        if (!element) return;

        const {

            delay = 0,

            duration = 700,

            distance = 35

        } = options;

        element.animate(

            [

                {

                    opacity: 0,

                    transform: `translateY(${distance}px)`

                },

                {

                    opacity: 1,

                    transform: "translateY(0)"

                }

            ],

            {

                duration,

                delay,

                easing: "ease-out",

                fill: "forwards"

            }

        );

    }

};


/* =====================================================
   SMART SECTION REVEAL
===================================================== */

(() => {

    const elements = document.querySelectorAll(

        ".skill-card,\
.future-card,\
.difference-item,\
.benefit-card,\
.growth-box,\
.value-card,\
.meet-card,\
.stay-card,\
.timeline-item,\
.community-grid > div,\
.school-grid > div,\
.dashboard-grid > div,\
.philosophy-grid > div,\
.stat,\
.faq-item"

    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                KidsorraAnimation.reveal(

                    entry.target,

                    {

                        duration: 700

                    }

                );

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach(item => {

        observer.observe(item);

    });

})();


/* =====================================================
   STAGGER GRID ANIMATION
===================================================== */

(() => {

    const grids = document.querySelectorAll(

        ".skills-grid,\
.future-grid,\
.difference-grid,\
.benefits-grid,\
.growth-wrapper,\
.values-grid,\
.meet-grid,\
.stay-grid,\
.timeline,\
.community-grid,\
.school-grid,\
.dashboard-grid,\
.philosophy-grid"

    );

    if (!grids.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                [...entry.target.children].forEach(

                    (item, index) => {

                        item.animate(

                            [

                                {

                                    opacity: 0,

                                    transform:

                                    "translateY(30px)"

                                },

                                {

                                    opacity: 1,

                                    transform:

                                    "translateY(0)"

                                }

                            ],

                            {

                                duration: 650,

                                delay: index * 90,

                                easing: "ease-out",

                                fill: "forwards"

                            }

                        );

                    }

                );

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: .15

        }

    );

    grids.forEach(grid => observer.observe(grid));

})();


/* =====================================================
   HERO FLOAT ANIMATION
===================================================== */

(() => {

    const heroVisual = document.querySelector(".hero-visual");

    if (!heroVisual) return;

    heroVisual.animate(

        [

            {

                transform: "translateY(0)"

            },

            {

                transform: "translateY(-10px)"

            },

            {

                transform: "translateY(0)"

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
   FAQ AUTO ANIMATION
===================================================== */

(() => {

    const faq = document.querySelectorAll(".faq-item");

    if (!faq.length) return;

    faq.forEach(item => {

        item.style.transition =

            "transform .25s ease";

        item.addEventListener("mouseenter", () => {

            item.style.transform =

                "translateY(-4px)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "";

        });

    });

})();


/* =====================================================
   PERFORMANCE MODE
===================================================== */

(() => {

    let timer;

    function optimize() {

        document.body.classList.add(

            "performance-mode"

        );

        clearTimeout(timer);

        timer = setTimeout(() => {

            document.body.classList.remove(

                "performance-mode"

            );

        }, 400);

    }

    window.addEventListener(

        "scroll",

        optimize,

        {

            passive: true

        }

    );

})();


/* =====================================================
   REDUCE MOTION SUPPORT
===================================================== */

(() => {

    const media = window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );

    function update() {

        document.body.classList.toggle(

            "reduce-motion",

            media.matches

        );

    }

    update();

    media.addEventListener(

        "change",

        update

    );

})();


/* =====================================================
   PAGE READY
===================================================== */

window.addEventListener(

    "load",

    () => {

        document.body.classList.add(

            "kidsorra-ready"

        );

        console.log(

            "%cKidsorra UI Ready",

            "color:#35C759;font-size:16px;font-weight:bold;"

        );

    }

);


/* =====================================================
   ENGINE STATUS
===================================================== */

console.log(

    "%cKidsorra Engine Part 14 Ready",

    "color:#35C759;font-size:15px;font-weight:bold;"

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
/* ==========================================
BOOK DEMO FORM
========================================== */

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {

bookingForm.addEventListener("submit", async function (e) {

e.preventDefault();

const formData = new FormData(bookingForm);

const response = await fetch(bookingForm.action, {

method: "POST",

body: formData,

headers: {

'Accept': 'application/json'

}

});

if (response.ok) {

bookingForm.reset();

bookingForm.innerHTML = `

<div style="text-align:center;padding:60px 20px;">

<h2 style="color:#6B4EFF;font-size:34px;margin-bottom:20px;">

🎉 Thank You!

</h2>

<p style="font-size:20px;color:#555;line-height:1.8;">

Your Free Demo request has been successfully received.

<br><br>

Our Kidsorra team will contact you shortly.

</p>

</div>

`;

}

else{

alert("Something went wrong. Please try again.");

}

});

}

