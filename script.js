/* =========================================
   KIDSORRA WEBSITE
   Script Upgrade
   Part 19 — Step 3
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌈 Welcome to Kidsorra!");

    /* =====================================
       HERO FADE
    ===================================== */

    const hero = document.querySelector(".hero");

    if (hero) {
        hero.style.opacity = "0";
        hero.style.transform = "translateY(20px)";

        setTimeout(() => {
            hero.style.transition = "1s ease";
            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";
        }, 250);
    }

    /* =====================================
       BUTTON EFFECT
    ===================================== */

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(.96)";

            setTimeout(() => {
                button.style.transform = "";
            }, 120);

        });

    });

    /* =====================================
       COUNTER
    ===================================== */

    const counters = document.querySelectorAll(".counter");

    const startCounter = counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const speed = target / 120;

        function update() {

            current += speed;

            if (current < target) {

                counter.innerText = Math.ceil(current);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        }

        update();

    };

    /* =====================================
       SCROLL ANIMATION
    ===================================== */

    const fadeElements = document.querySelectorAll(
        ".section-title, .program-card, .why-card, .experience-card, .journey-step, .schools-container, .meet-container, .testimonial, .stat"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

                setTimeout(() => {

                    entry.target.classList.add("show");

                }, 80);

                if (entry.target.classList.contains("stat")) {

                    const counter = entry.target.querySelector(".counter");

                    if (counter && !counter.classList.contains("started")) {

                        counter.classList.add("started");

                        startCounter(counter);

                    }

                }

            }

        });

    }, {
        threshold: 0.18
    });

    fadeElements.forEach(item => observer.observe(item));

    /* =====================================
       MOBILE MENU
    ===================================== */

    /* =====================================
   PREMIUM MOBILE MENU
===================================== */


const menuButton = document.querySelector(".menu-toggle");

const nav = document.querySelector(".nav-links");

const overlay = document.querySelector(".mobile-menu-overlay");


if(menuButton && nav && overlay){


    menuButton.addEventListener("click",()=>{


        nav.classList.toggle("active");

        overlay.classList.toggle("active");


    });



    overlay.addEventListener("click",()=>{


        nav.classList.remove("active");

        overlay.classList.remove("active");


    });



    nav.querySelectorAll("li").forEach(link=>{


        link.addEventListener("click",()=>{


            nav.classList.remove("active");

            overlay.classList.remove("active");


        });


    });


}

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

    }
/* =====================================
   BACK TO TOP BUTTON
===================================== */


const backTop = document.querySelector(".back-to-top");


if(backTop){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 500){


            backTop.classList.add("show");


        }else{


            backTop.classList.remove("show");


        }


    });



    backTop.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });


}
});
