/* =========================================
   KIDSORRA WEBSITE
   CLEAN SCRIPT VERSION 2.0

   Part 19 Step 3
   Part 20 Step 1-2-3
========================================= */


document.addEventListener("DOMContentLoaded",()=>{


console.log("🌈 Welcome to Kidsorra!");



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
