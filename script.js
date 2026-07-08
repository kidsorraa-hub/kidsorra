/* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0
   PART 1 / 7
   Core + Multi Language
=================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

console.log("Kidsorra Loaded");

/* ======================================
   LANGUAGE SYSTEM
====================================== */

const LANGUAGES = [
    "en",
    "fa",
    "ar",
    "th",
    "zh"
];

let currentLanguage =
localStorage.getItem("kidsorra-language") || "en";


function setLanguage(lang){

    if(!LANGUAGES.includes(lang)) return;

    currentLanguage = lang;

    localStorage.setItem(
        "kidsorra-language",
        lang
    );

    document.documentElement.lang = lang;

    if(lang==="fa" || lang==="ar"){

        document.documentElement.dir="rtl";

    }else{

        document.documentElement.dir="ltr";

    }

    updateTexts();

}


/* ======================================
   TRANSLATION DATABASE
====================================== */

const translations = {

en:{},

fa:{},

ar:{},

th:{},

zh:{}

};


/* ======================================
   UPDATE ALL TEXTS
====================================== */

function updateTexts(){

    document
    .querySelectorAll("[data-i18n]")
    .forEach(el=>{

        const key =
        el.dataset.i18n;

        if(
            translations[currentLanguage] &&
            translations[currentLanguage][key]
        ){

            el.innerHTML =
            translations[currentLanguage][key];

        }

    });

}


/* ======================================
   LANGUAGE BUTTONS
====================================== */

document
.querySelectorAll("[data-language]")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        setLanguage(
            btn.dataset.language
        );

    });

});


setLanguage(currentLanguage);

     /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0
   PART 2 / 7
   Preloader + Navbar + Mobile Menu
=================================================== */


/* ======================================
   PRELOADER SYSTEM
====================================== */

function initPreloader(){

    const preloader =
    document.querySelector("#preloader");


    if(!preloader) return;


    window.addEventListener("load",()=>{


        setTimeout(()=>{


            preloader.classList.add("hide");


            setTimeout(()=>{

                preloader.remove();

            },800);



        },900);



    });


}


initPreloader();





/* ======================================
   NAVBAR SCROLL EFFECT
====================================== */


function initNavbar(){


    const header =
    document.querySelector("header");


    const navbar =
    document.querySelector(".navbar");


    if(!header) return;



    window.addEventListener("scroll",()=>{


        if(window.scrollY > 50){


            header.classList.add(
                "sticky"
            );


            if(navbar){

                navbar.classList.add(
                    "scrolled"
                );

            }


        }else{


            header.classList.remove(
                "sticky"
            );


            if(navbar){

                navbar.classList.remove(
                    "scrolled"
                );

            }


        }


    });



}


initNavbar();






/* ======================================
   MOBILE MENU SYSTEM
====================================== */


function initMobileMenu(){


const menuToggle =
document.querySelector(".menu-toggle");


const navLinks =
document.querySelector(".nav-links");


const overlay =
document.querySelector(
".mobile-menu-overlay"
);



if(
!menuToggle ||
!navLinks
) return;




function openMenu(){


    navLinks.classList.add(
        "active"
    );


    if(overlay){

        overlay.classList.add(
            "active"
        );

    }


    document.body.classList.add(
        "menu-open"
    );


    menuToggle.innerHTML="✖";


}



function closeMenu(){


    navLinks.classList.remove(
        "active"
    );


    if(overlay){

        overlay.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "menu-open"
    );


    menuToggle.innerHTML="☰";


}




menuToggle.addEventListener(
"click",
()=>{


    if(
    navLinks.classList.contains(
    "active")
    ){

        closeMenu();

    }else{

        openMenu();

    }


});





if(overlay){

overlay.addEventListener(
"click",
closeMenu
);

}





navLinks
.querySelectorAll("li")
.forEach(item=>{


item.addEventListener(
"click",
closeMenu
);



});



}



initMobileMenu();







/* ======================================
   SMOOTH SCROLL
====================================== */


function initSmoothScroll(){


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(link=>{


link.addEventListener(
"click",
function(e){


const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}



});



});



}



initSmoothScroll();







console.log(
"✅ Part 2 Loaded"
);

 /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0

   PART 3 / 7
   Scroll Reveal + Counter Animation
=================================================== */


/* ======================================
   SCROLL REVEAL SYSTEM
====================================== */


function initScrollReveal(){


const elements = document.querySelectorAll(

`
section,
.program-card,
.why-card,
.why-box,
.experience-card,
.testimonial,
.stat,
.journey-step,
.contact-card,
.faq-item,
.method-card,
.parent-card,
.booking-card
`

);



if(!elements.length) return;




elements.forEach(element=>{


    element.classList.add(
        "reveal"
    );


});




const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"active"
);



revealObserver.unobserve(
entry.target
);



}



});


},
{

threshold:.15

}

);





elements.forEach(element=>{


revealObserver.observe(
element
);



});



}




initScrollReveal();







/* ======================================
   NUMBER COUNTER SYSTEM
====================================== */


function animateCounter(counter){


const target =
parseInt(
counter.dataset.target
);



if(!target) return;




let current = 0;


const duration = 1800;


const increment =
target /
(duration / 16);





function update(){


current += increment;




if(current < target){


counter.innerText =
Math.floor(current);


requestAnimationFrame(
update
);



}else{


counter.innerText =
target;



}



}



update();



}








function initCounters(){


const counters =
document.querySelectorAll(
".counter"
);



if(!counters.length)
return;



const counterObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(
entry.isIntersecting &&
!entry.target.dataset.started
){


entry.target.dataset.started =
"true";



animateCounter(
entry.target
);



}


});


},
{

threshold:.7

}

);




counters.forEach(counter=>{


counterObserver.observe(
counter
);



});



}



initCounters();







/* ======================================
   CARD HOVER MOTION
====================================== */


function initCardMotion(){


const cards =
document.querySelectorAll(

`
.program-card,
.why-card,
.why-box,
.experience-card,
.testimonial,
.stat
`

);




cards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{


card.style.transition =
".35s ease";



});




card.addEventListener(
"mouseleave",
()=>{


card.style.transform =
"";



});



});



}



initCardMotion();







/* ======================================
   ACTIVE FAQ SYSTEM
====================================== */


function initFAQ(){


const faqItems =
document.querySelectorAll(
".faq-item"
);



if(!faqItems.length)
return;




faqItems.forEach(item=>{


const button =
item.querySelector(
".faq-question"
);



if(!button)
return;




button.addEventListener(
"click",
()=>{


faqItems.forEach(other=>{


if(
other !== item
){

other.classList.remove(
"active"
);


}



});




item.classList.toggle(
"active"
);



});



});



}



initFAQ();







/* ======================================
   LANGUAGE READY DIRECTION SYSTEM
   فارسی / عربی / تایلندی / چینی / انگلیسی
====================================== */


function setLanguageDirection(){


const lang =
document.documentElement
.lang;




const rtlLanguages =
[

"fa",
"ar"

];





if(
rtlLanguages.includes(lang)
){


document.documentElement.dir =
"rtl";



}else{


document.documentElement.dir =
"ltr";



}



}



setLanguageDirection();







console.log(
"✨ Part 3 Loaded Successfully"
);


   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0

   PART 4 / 7
   MULTI LANGUAGE SYSTEM

   Languages:
   English 🇬🇧
   Persian 🇮🇷
   Arabic 🇸🇦
   Thai 🇹🇭
   Chinese 🇨🇳
=================================================== */


/* ======================================
   LANGUAGE DATABASE
====================================== */


const languages = {


en:{


name:"English",

direction:"ltr",


texts:{


logo:"Kidsorra",

home:"Home",

about:"About",

programs:"Programs",

schools:"Schools",

parents:"Parents",

contact:"Contact",

demo:"Book Demo",


heroTitle:
"Smart Learning For Every Child",


heroText:
"Kidsorra creates joyful learning experiences with technology, creativity and care.",


primaryButton:
"Start Learning",


secondaryButton:
"Explore Programs",


methodTitle:
"Our Learning Method",


parentsTitle:
"Designed For Parents",


faqTitle:
"Frequently Asked Questions",


contactTitle:
"Contact Us"


}



},






fa:{


name:"فارسی",

direction:"rtl",


texts:{


logo:"کیدسورا",

home:"خانه",

about:"درباره ما",

programs:"برنامه‌ها",

schools:"مدارس",

parents:"والدین",

contact:"تماس",

demo:"رزرو دمو",


heroTitle:
"یادگیری هوشمند برای هر کودک",


heroText:
"کیدسورا تجربه‌ای شاد و خلاقانه برای رشد و یادگیری کودکان ایجاد می‌کند.",


primaryButton:
"شروع یادگیری",


secondaryButton:
"مشاهده برنامه‌ها",


methodTitle:
"روش آموزشی ما",


parentsTitle:
"طراحی شده برای والدین",


faqTitle:
"سوالات متداول",


contactTitle:
"تماس با ما"


}



},






ar:{


name:"العربية",

direction:"rtl",


texts:{


logo:"كيدسورا",

home:"الرئيسية",

about:"من نحن",

programs:"البرامج",

schools:"المدارس",

parents:"الآباء",

contact:"اتصل بنا",

demo:"احجز تجربة",


heroTitle:
"تعلم ذكي لكل طفل",


heroText:
"كيدسورا تقدم تجربة تعليمية ممتعة ومبتكرة للأطفال.",


primaryButton:
"ابدأ التعلم",


secondaryButton:
"استكشف البرامج",


methodTitle:
"طريقة التعلم لدينا",


parentsTitle:
"مصمم للآباء",


faqTitle:
"الأسئلة الشائعة",


contactTitle:
"تواصل معنا"


}



},






th:{


name:"ไทย",

direction:"ltr",


texts:{


logo:"Kidsorra",

home:"หน้าแรก",

about:"เกี่ยวกับเรา",

programs:"โปรแกรม",

schools:"โรงเรียน",

parents:"ผู้ปกครอง",

contact:"ติดต่อ",

demo:"จองทดลอง",


heroTitle:
"การเรียนรู้ที่ชาญฉลาดสำหรับเด็กทุกคน",


heroText:
"Kidsorra สร้างประสบการณ์การเรียนรู้ที่สนุกและสร้างสรรค์",


primaryButton:
"เริ่มเรียนรู้",


secondaryButton:
"ดูโปรแกรม",


methodTitle:
"วิธีการเรียนรู้ของเรา",


parentsTitle:
"สำหรับผู้ปกครอง",


faqTitle:
"คำถามที่พบบ่อย",


contactTitle:
"ติดต่อเรา"


}



},






zh:{


name:"中文",

direction:"ltr",


texts:{


logo:"Kidsorra",

home:"首页",

about:"关于我们",

programs:"课程",

schools:"学校",

parents:"家长",

contact:"联系我们",

demo:"预约体验",


heroTitle:
"为每个孩子提供智能学习",


heroText:
"Kidsorra 为孩子创造快乐、有创造力的学习体验。",


primaryButton:
"开始学习",


secondaryButton:
"查看课程",


methodTitle:
"我们的学习方法",


parentsTitle:
"为家长设计",


faqTitle:
"常见问题",


contactTitle:
"联系我们"


}



}



};






/* ======================================
   APPLY LANGUAGE
====================================== */


function changeLanguage(lang){



const data =
languages[lang];



if(!data)
return;





document.documentElement.lang =
lang;



document.documentElement.dir =
data.direction;





localStorage.setItem(
"kidsorra-language",
lang
);






document.querySelectorAll(
"[data-lang]"
)
.forEach(element=>{


const key =
element.dataset.lang;



if(data.texts[key]){


element.innerHTML =
data.texts[key];



}



});






}




/* ======================================
   LOAD SAVED LANGUAGE
====================================== */


function loadLanguage(){



const saved =
localStorage.getItem(
"kidsorra-language"
)
||
"en";



changeLanguage(saved);



}




loadLanguage();







/* ======================================
   LANGUAGE BUTTONS
====================================== */


document.querySelectorAll(
".language-btn"
)
.forEach(button=>{


button.addEventListener(
"click",
()=>{


const lang =
button.dataset.language;



changeLanguage(
lang
);



});



});







console.log(
"🌍 Multi Language System Loaded"
);

   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0

   PART 5 / 7
   Language UI + Form Translation
=================================================== */


/* ======================================
   LANGUAGE SELECTOR
====================================== */

function initLanguageSelector() {

    const selector = document.querySelector(".language-selector");
    const menu = document.querySelector(".language-menu");

    if (!selector || !menu) return;

    selector.addEventListener("click", (e) => {

        e.stopPropagation();

        menu.classList.toggle("active");

    });

    document.addEventListener("click", () => {

        menu.classList.remove("active");

    });

}

initLanguageSelector();



/* ======================================
   UPDATE ACTIVE LANGUAGE BUTTON
====================================== */

function updateLanguageButtons(lang){

    document
    .querySelectorAll(".language-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

        if(btn.dataset.language===lang){

            btn.classList.add("active");

        }

    });

}



/* ======================================
   OVERRIDE changeLanguage
====================================== */

const originalChangeLanguage = changeLanguage;

changeLanguage = function(lang){

    originalChangeLanguage(lang);

    updateLanguageButtons(lang);

    translateForm(lang);

};




/* ======================================
   BOOKING FORM TRANSLATION
====================================== */

function translateForm(lang){

    const placeholder = {

        en:{
            child:"Child Name",
            parent:"Parent Name",
            email:"Email Address",
            phone:"Phone Number",
            message:"Tell us about your child..."
        },

        fa:{
            child:"نام کودک",
            parent:"نام والد",
            email:"ایمیل",
            phone:"شماره تماس",
            message:"درباره کودک خود بنویسید..."
        },

        ar:{
            child:"اسم الطفل",
            parent:"اسم ولي الأمر",
            email:"البريد الإلكتروني",
            phone:"رقم الهاتف",
            message:"أخبرنا عن طفلك..."
        },

        th:{
            child:"ชื่อเด็ก",
            parent:"ชื่อผู้ปกครอง",
            email:"อีเมล",
            phone:"เบอร์โทร",
            message:"บอกเราเกี่ยวกับเด็ก..."
        },

        zh:{
            child:"孩子姓名",
            parent:"家长姓名",
            email:"电子邮箱",
            phone:"电话号码",
            message:"请介绍一下您的孩子..."
        }

    };

    const data = placeholder[lang];

    if(!data) return;

    const child =
    document.querySelector("#childName");

    const parent =
    document.querySelector("#parentName");

    const email =
    document.querySelector("#email");

    const phone =
    document.querySelector("#phone");

    const message =
    document.querySelector("#message");

    if(child) child.placeholder=data.child;
    if(parent) parent.placeholder=data.parent;
    if(email) email.placeholder=data.email;
    if(phone) phone.placeholder=data.phone;
    if(message) message.placeholder=data.message;

}




/* ======================================
   LANGUAGE CHANGE ANIMATION
====================================== */

function animateLanguageChange(){

    document.body.classList.add("language-changing");

    setTimeout(()=>{

        document.body.classList.remove("language-changing");

    },350);

}

document
.querySelectorAll(".language-btn")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        animateLanguageChange();

    });

});




/* ======================================
   INITIALIZE
====================================== */

updateLanguageButtons(

localStorage.getItem("kidsorra-language") || "en"

);

translateForm(

localStorage.getItem("kidsorra-language") || "en"

);

console.log("🌍 Part 5 Loaded Successfully");

   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0

   PART 6 / 7

   Premium Effects:
   Cursor
   Ripple
   Tilt
   Parallax
   Performance Control
=================================================== */



/* ======================================
   RIPPLE EFFECT
====================================== */


function initRipple(){


const buttons =
document.querySelectorAll(
"button, .btn-primary, .btn-secondary, .primary, .secondary, .demo-btn"
);



buttons.forEach(button=>{


button.addEventListener(
"click",
function(e){


const circle =
document.createElement("span");


const rect =
this.getBoundingClientRect();


const size =
Math.max(
rect.width,
rect.height
);



circle.style.width =
size+"px";


circle.style.height =
size+"px";


circle.style.left =
(
e.clientX -
rect.left -
size/2
)+"px";


circle.style.top =
(
e.clientY -
rect.top -
size/2
)+"px";



circle.className =
"ripple";



this.appendChild(circle);



setTimeout(()=>{

circle.remove();

},600);



});



});


}


initRipple();







/* ======================================
   PREMIUM CURSOR
====================================== */


function initCursor(){


if(window.innerWidth < 900)
return;



let dot =
document.querySelector(".cursor-dot");


let ring =
document.querySelector(".cursor-ring");



if(!dot || !ring)
return;




document.addEventListener(
"mousemove",
(e)=>{


dot.style.left =
e.clientX+"px";


dot.style.top =
e.clientY+"px";



ring.style.left =
e.clientX+"px";


ring.style.top =
e.clientY+"px";



});





document.querySelectorAll(
"a,button,.program-card,.why-card,.experience-card"
)
.forEach(item=>{


item.addEventListener(
"mouseenter",
()=>{

ring.classList.add("active");

});


item.addEventListener(
"mouseleave",
()=>{

ring.classList.remove("active");

});


});



}



initCursor();







/* ======================================
   CARD 3D TILT
====================================== */


function initTilt(){


const cards =
document.querySelectorAll(
".program-card,.why-card,.experience-card,.testimonial,.stat"
);



cards.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


const rect =
card.getBoundingClientRect();


const x =
e.clientX -
rect.left;


const y =
e.clientY -
rect.top;



const rotateX =
((y - rect.height/2)/20)
*
-1;


const rotateY =
((x - rect.width/2)/20);



card.style.transform =
`
perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;



});




card.addEventListener(
"mouseleave",
()=>{


card.style.transform="";


});



});



}



initTilt();







/* ======================================
   HERO PARALLAX
====================================== */


function initHeroParallax(){


const hero =
document.querySelector(".hero-visual");


const stars =
document.querySelectorAll(".star");



if(!hero)
return;



let ticking=false;



window.addEventListener(
"mousemove",
(e)=>{


if(ticking)
return;


ticking=true;



requestAnimationFrame(()=>{


const x =
(
window.innerWidth/2 -
e.clientX
)
/40;



const y =
(
window.innerHeight/2 -
e.clientY
)
/40;



hero.style.transform =
`
translate(${x}px,${y}px)
`;



stars.forEach(
(star,index)=>{


const speed =
(index+1)*3;


star.style.transform =
`
translate(
${x*speed}px,
${y*speed}px
)
`;



});



ticking=false;



});



});


}



initHeroParallax();







/* ======================================
   FLOATING TAG EFFECT
====================================== */


function initFloatingTags(){


const tags =
document.querySelectorAll(
".floating-tag"
);



if(!tags.length)
return;




document.addEventListener(
"mousemove",
(e)=>{


const x =
(
e.clientX /
window.innerWidth -
0.5
);


const y =
(
e.clientY /
window.innerHeight -
0.5
);



tags.forEach(
(tag,index)=>{


const speed =
(index+1)*8;



tag.style.transform =
`
translate(
${x*speed}px,
${y*speed}px
)
`;



});


});


}



initFloatingTags();







/* ======================================
   SMOOTH IMAGE LOAD
====================================== */


document
.querySelectorAll("img")
.forEach(img=>{


img.addEventListener(
"load",
()=>{


img.classList.add(
"loaded"
);


});


});







/* ======================================
   REDUCE MOTION SUPPORT
====================================== */


if(
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches
){


document.documentElement
.classList.add(
"reduce-motion"
);


}







/* ======================================
   PERFORMANCE CLEANUP
====================================== */


window.addEventListener(
"beforeunload",
()=>{


document
.querySelectorAll(".ripple")
.forEach(
(item)=>item.remove()
);


});






console.log(
"✨ Part 6 Premium Effects Loaded"
);
   
/* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0

   PART 7 / 7

   FINAL SYSTEM:
   SEO
   Accessibility
   RTL/LTR
   Performance
   Security
   Final Initialization
=================================================== */



/* ======================================
   RTL / LTR FONT CONTROL
====================================== */


function updateDirectionStyle(){


const lang =
localStorage.getItem(
"kidsorra-language"
)
|| "en";



const rtlLanguages = [
"fa",
"ar"
];



if(
rtlLanguages.includes(lang)
){


document.body.classList.add(
"rtl-mode"
);


document.body.classList.remove(
"ltr-mode"
);



}else{


document.body.classList.add(
"ltr-mode"
);


document.body.classList.remove(
"rtl-mode"
);


}



}



updateDirectionStyle();







/* ======================================
   LANGUAGE CHANGE LISTENER
====================================== */


document
.querySelectorAll(".language-btn")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


setTimeout(()=>{


updateDirectionStyle();


},100);



});



});







/* ======================================
   ACCESSIBILITY
====================================== */



function accessibilitySetup(){


/* keyboard focus */


document
.querySelectorAll(
"a,button,input,select,textarea"
)
.forEach(element=>{


element.addEventListener(
"focus",
()=>{


element.classList.add(
"keyboard-focus"
);


});



element.addEventListener(
"blur",
()=>{


element.classList.remove(
"keyboard-focus"
);


});



});



}



accessibilitySetup();







/* ======================================
   LAZY IMAGE LOADING
====================================== */


function lazyImages(){


const images =
document.querySelectorAll(
"img"
);



images.forEach(img=>{


if(
!img.hasAttribute("loading")
){


img.setAttribute(
"loading",
"lazy"
);


}



});



}



lazyImages();







/* ======================================
   SEO DYNAMIC PAGE TITLE
====================================== */


function updateSEO(){



const lang =
localStorage.getItem(
"kidsorra-language"
)
|| "en";



const titles={


en:
"Kidsorra | Smart Learning For Kids",


fa:
"کیدسورا | آموزش هوشمند کودکان",


ar:
"كيدسورا | التعليم الذكي للأطفال",


th:
"Kidsorra | การเรียนรู้สำหรับเด็ก",


zh:
"Kidsorra | 儿童智能学习"

};



document.title =
titles[lang];



}



updateSEO();







/* ======================================
   LANGUAGE SEO UPDATE
====================================== */


document
.querySelectorAll(".language-btn")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


setTimeout(()=>{


updateSEO();


},200);



});



});







/* ======================================
   FORM VALIDATION
====================================== */


function validateForms(){


const forms =
document.querySelectorAll(
"form"
);



forms.forEach(form=>{


form.addEventListener(
"submit",
(e)=>{


const required =
form.querySelectorAll(
"[required]"
);



let valid=true;



required.forEach(input=>{


if(
input.value.trim()===""
){


valid=false;

input.classList.add(
"error"
);


}else{


input.classList.remove(
"error"
);


}



});




if(!valid){


e.preventDefault();


alert(
"Please complete all required fields"
);



}



});



});



}



validateForms();







/* ======================================
   SCROLL PROGRESS BAR
====================================== */


function createScrollBar(){


const bar =
document.createElement(
"div"
);



bar.className =
"scroll-progress";



document.body.appendChild(
bar
);




window.addEventListener(
"scroll",
()=>{


const height =
document.documentElement.scrollHeight -
window.innerHeight;



const progress =
(
window.scrollY /
height
)
*
100;



bar.style.width =
progress+"%";



});



}



createScrollBar();







/* ======================================
   STOP IMAGE DRAG
====================================== */


document
.querySelectorAll("img")
.forEach(img=>{


img.addEventListener(
"dragstart",
(e)=>{


e.preventDefault();



});



});







/* ======================================
   FINAL SITE READY
====================================== */


window.addEventListener(
"load",
()=>{


document.body.classList.add(
"site-loaded"
);



console.log(
"🚀 Kidsorra Premium Website Ready"
);



});







/* ======================================
   ERROR SAFE HANDLER
====================================== */


window.addEventListener(
"error",
(e)=>{


console.warn(
"Kidsorra handled error:",
e.message
);



});







console.log(
"✅ Part 7 Final Integration Loaded"
);

   
