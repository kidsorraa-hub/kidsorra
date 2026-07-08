/* =========================================
   KIDSORRA WEBSITE
   CLEAN SCRIPT VERSION 2.0

   Part 19 Step 3
   Part 20 Step 1-2-3
========================================= */


document.addEventListener("DOMContentLoaded",()=>{


console.log("🌈 Welcome to Kidsorra!");

/* =====================================
PART 20 STEP 8
PRELOADER EXIT
===================================== */

const preloader = document.getElementById("preloader");

if(preloader){

    window.addEventListener("load",()=>{

        preloader.style.opacity="0";

        preloader.style.visibility="hidden";

        preloader.style.transition="all .8s ease";

        setTimeout(()=>{

            preloader.remove();

        },800);

    });

}
   

/* =====================================
   HERO FADE
===================================== */


const hero=document.querySelector(".hero");


if(hero){

    hero.style.opacity="0";

    hero.style.transform="translateY(20px)";


    setTimeout(()=>{

        hero.style.transition="1s ease";

        hero.style.opacity="1";

        hero.style.transform="translateY(0)";


    },250);

}



/* =====================================
   BUTTON CLICK EFFECT
===================================== */


document.querySelectorAll("button").forEach(button=>{


    button.addEventListener("click",()=>{


        button.style.transform="scale(.96)";


        setTimeout(()=>{


            button.style.transform="";


        },120);



    });


});





/* =====================================
   COUNTER FUNCTION
===================================== */


const startCounter=(counter)=>{


    const target=Number(counter.dataset.target);


    let current=0;


    const speed=target/120;



    function update(){


        current+=speed;



        if(current<target){


            counter.innerText=Math.ceil(current);


            requestAnimationFrame(update);



        }else{


            counter.innerText=target;


        }


    }



    update();


};





/* =====================================
   PREMIUM SCROLL ANIMATION
===================================== */


const fadeElements=document.querySelectorAll(

".section-title, .program-card, .why-card, .experience-card, .journey-step, .schools-container, .meet-container, .testimonial, .stat"

);



const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){



        entry.target.classList.add("fade-up");



        requestAnimationFrame(()=>{


            entry.target.classList.add("show");


        });





        if(entry.target.classList.contains("stat")){


            const counter=entry.target.querySelector(".counter");



            if(counter && !counter.classList.contains("started")){


                counter.classList.add("started");


                startCounter(counter);



            }


        }




        observer.unobserve(entry.target);



    }


});


},{

threshold:.18

});




fadeElements.forEach(item=>{


    observer.observe(item);


});






/* =====================================
   PREMIUM MOBILE MENU
===================================== */


const menuButton=document.querySelector(".menu-toggle");

const nav=document.querySelector(".nav-links");

const overlay=document.querySelector(".mobile-menu-overlay");




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



/* =====================================
   NAVBAR SHADOW ON SCROLL
===================================== */

const navbar = document.querySelector(".navbar");

if(navbar){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 40){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    });

}



/* =====================================
   HERO PARALLAX
===================================== */

const heroVisual = document.querySelector(".hero-visual");

if(heroVisual){

    window.addEventListener("scroll",()=>{

        const y = window.scrollY * 0.15;

        heroVisual.style.transform = `translateY(${y}px)`;

    });

}



/* =====================================
   FLOATING TAG PARALLAX
===================================== */

const tags = document.querySelectorAll(".floating-tag");

if(tags.length){

    window.addEventListener("mousemove",(e)=>{

        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        tags.forEach((tag,index)=>{

            const speed = (index + 1) * 2;

            tag.style.transform =
            `translate(${x*speed}px, ${y*speed}px)`;

        });

    });

}



/* =====================================
   BUTTON HOVER SOUND PLACEHOLDER
===================================== */

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transition=".25s";

    });

});



/* =====================================
   PAGE LOADED
===================================== */

console.log("✅ Kidsorra Script Loaded Successfully");

});


/* =====================================
   PART 20 — STEP 4
   SCRIPT INTERACTION UPGRADE
===================================== */


/* ===============================
   BUTTON RIPPLE EFFECT
=============================== */


document.querySelectorAll(
"button, .btn-primary, .btn-secondary, .primary, .secondary, .demo-btn"
).forEach(button=>{


    button.addEventListener("click",function(e){


        const ripple=document.createElement("span");


        const rect=this.getBoundingClientRect();


        const size=Math.max(
            rect.width,
            rect.height
        );


        ripple.style.width=size+"px";

        ripple.style.height=size+"px";


        ripple.style.left=
        e.clientX-rect.left-size/2+"px";


        ripple.style.top=
        e.clientY-rect.top-size/2+"px";


        ripple.className="ripple";


        this.appendChild(ripple);



        setTimeout(()=>{

            ripple.remove();

        },600);



    });


});





/* ===============================
   HERO MOUSE PARALLAX
=============================== */


const heroCard=document.querySelector(".character-card");


if(heroCard){


document.addEventListener("mousemove",(e)=>{


    const x=
    (window.innerWidth/2-e.clientX)/40;


    const y=
    (window.innerHeight/2-e.clientY)/40;



    heroCard.style.transform=
    `
    translate(${x}px,${y}px)
    `;



});



}






/* ===============================
   CARD TILT EFFECT
=============================== */


const cards=document.querySelectorAll(
".program-card, .why-card, .experience-card"
);



cards.forEach(card=>{


card.addEventListener("mousemove",(e)=>{


    const rect=
    card.getBoundingClientRect();



    const x=
    e.clientX-rect.left;


    const y=
    e.clientY-rect.top;



    const rotateX=
    ((y-rect.height/2)/20)*-1;


    const rotateY=
    ((x-rect.width/2)/20);



    card.style.transform=
    `
    perspective(800px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-8px)
    `;



});



card.addEventListener("mouseleave",()=>{


    card.style.transform="";


});



});






/* ===============================
   CURSOR GLOW
=============================== */


const cursorGlow=document.createElement("div");


cursorGlow.className="cursor-glow";


document.body.appendChild(cursorGlow);



document.addEventListener("mousemove",(e)=>{


cursorGlow.style.left=
e.clientX+"px";


cursorGlow.style.top=
e.clientY+"px";


});






console.log("✨ Part 20 Step 4 Interaction Loaded");

/* =====================================
   PART 20 — STEP 5
   PREMIUM PRELOADER
===================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

            setTimeout(() => {

                preloader.remove();

            }, 800);

        }, 1200);

    }



   /* =====================================
PRELOADER
===================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){

        setTimeout(() => {

            preloader.classList.add("hide");

        },800);

    }

});

 /* =====================================
PREMIUM CURSOR
===================================== */


const cursorDot =
document.querySelector(".cursor-dot");


const cursorRing =
document.querySelector(".cursor-ring");


if(cursorDot && cursorRing && window.innerWidth > 900){


document.addEventListener("mousemove",(e)=>{


cursorDot.style.left=e.clientX+"px";

cursorDot.style.top=e.clientY+"px";


cursorRing.style.left=e.clientX+"px";

cursorRing.style.top=e.clientY+"px";


});



document.querySelectorAll(
"button, a, .program-card, .why-card"
).forEach(item=>{


item.addEventListener("mouseenter",()=>{

cursorRing.classList.add("active");

});


item.addEventListener("mouseleave",()=>{

cursorRing.classList.remove("active");

});


});


}  
/* =====================================
PART 20 STEP 6
SCROLL REVEAL
===================================== */


const revealElements = document.querySelectorAll(
    ".program-card, .why-card, .experience-card, .testimonial, .stat, .journey-step"
);


const revealObserver = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("active");


        }


    });


},{
    threshold:.15
});



revealElements.forEach(el=>{


    el.classList.add("reveal");


    revealObserver.observe(el);


});   
});
