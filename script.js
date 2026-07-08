/* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0 FIXED

   PART 1 / 5
   Core + Language Engine
=================================================== */

"use strict";


document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"🚀 Kidsorra Premium Loaded"
);



/* ======================================
   GLOBAL CONFIG
====================================== */


const CONFIG = {

languages:[
"en",
"fa",
"ar",
"th",
"zh"
],

defaultLanguage:"en"

};





let currentLanguage =
localStorage.getItem(
"kidsorra-language"
)
||
CONFIG.defaultLanguage;







/* ======================================
   TRANSLATION DATABASE
====================================== */


const LANG = {


en:{

dir:"ltr",

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

start:
"Start Learning",

explore:
"Explore Programs",

method:
"Our Learning Method",

faq:
"Frequently Asked Questions",

contactTitle:
"Contact Us"

}

},





fa:{

dir:"rtl",

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
"کیدسورا تجربه‌ای شاد و خلاقانه برای رشد کودکان ایجاد می‌کند.",

start:
"شروع یادگیری",

explore:
"مشاهده برنامه‌ها",

method:
"روش آموزشی ما",

faq:
"سوالات متداول",

contactTitle:
"تماس با ما"

}

},





ar:{

dir:"rtl",

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

start:
"ابدأ التعلم",

explore:
"استكشف البرامج",

method:
"طريقة التعلم",

faq:
"الأسئلة الشائعة",

contactTitle:
"تواصل معنا"

}

},





th:{

dir:"ltr",

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

start:
"เริ่มเรียนรู้",

explore:
"ดูโปรแกรม",

method:
"วิธีการเรียนรู้",

faq:
"คำถามที่พบบ่อย",

contactTitle:
"ติดต่อเรา"

}

},





zh:{

dir:"ltr",

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

start:
"开始学习",

explore:
"查看课程",

method:
"学习方法",

faq:
"常见问题",

contactTitle:
"联系我们"

}

}



};









/* ======================================
   LANGUAGE APPLY SYSTEM
====================================== */


function applyLanguage(lang){


if(!CONFIG.languages.includes(lang))
return;



currentLanguage = lang;


localStorage.setItem(
"kidsorra-language",
lang
);



const data =
LANG[lang];



document.documentElement.lang =
lang;



document.documentElement.dir =
data.dir;





document
.querySelectorAll(
"[data-lang]"
)
.forEach(element=>{


const key =
element.dataset.lang;



if(
data.texts[key]
){


/*
 Secure text update
 prevents XSS
*/


element.textContent =
data.texts[key];


}



});




updateSEO(lang);


updateDirection(lang);


}





/* ======================================
   LANGUAGE BUTTONS
====================================== */


document
.querySelectorAll(
".language-btn"
)
.forEach(button=>{


button.addEventListener(
"click",
()=>{


applyLanguage(
button.dataset.language
);


});


});






/* ======================================
   INITIAL LANGUAGE LOAD
====================================== */


applyLanguage(
currentLanguage
);






console.log(
"🌍 Language Engine Ready"
);

   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0 FIXED

   PART 2 / 5
   UI Navigation Systems
=================================================== */



/* ======================================
   PRELOADER SYSTEM
====================================== */


function initPreloader(){


const loader =
document.querySelector(
"#preloader"
);



if(!loader)
return;




window.addEventListener(
"load",
()=>{


setTimeout(
()=>{


loader.classList.add(
"hide"
);



setTimeout(
()=>{


loader.remove();



},
700
);



},
800
);



});



}



initPreloader();








/* ======================================
   NAVBAR SCROLL EFFECT
====================================== */


function initNavbar(){


const header =
document.querySelector(
"header"
);


const navbar =
document.querySelector(
".navbar"
);



if(!header)
return;




function updateNavbar(){


if(
window.scrollY > 60
){


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



}





window.addEventListener(
"scroll",
updateNavbar,
{
passive:true
}
);



updateNavbar();


}



initNavbar();








/* ======================================
   MOBILE MENU SYSTEM
====================================== */


function initMobileMenu(){


const toggle =
document.querySelector(
".menu-toggle"
);



const menu =
document.querySelector(
".nav-links"
);



const overlay =
document.querySelector(
".mobile-menu-overlay"
);




if(
!toggle ||
!menu
)
return;





function openMenu(){


menu.classList.add(
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



toggle.innerHTML =
"✖";



}



function closeMenu(){


menu.classList.remove(
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



toggle.innerHTML =
"☰";



}






toggle.addEventListener(
"click",
()=>{


if(
menu.classList.contains(
"active"
)
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





menu
.querySelectorAll(
"a"
)
.forEach(link=>{


link.addEventListener(
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
this.getAttribute(
"href"
)
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:
"smooth",

block:
"start"

});


}



});



});



}



initSmoothScroll();









/* ======================================
   BACK TO TOP BUTTON
====================================== */


function initBackToTop(){


const button =
document.querySelector(
".back-to-top"
);



if(!button)
return;





window.addEventListener(
"scroll",
()=>{


if(
window.scrollY > 500
){


button.classList.add(
"show"
);


}else{


button.classList.remove(
"show"
);


}



},
{
passive:true
}
);






button.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});



}



initBackToTop();







console.log(
"✅ Part 2 Navigation Loaded"
);

  /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0 FIXED

   PART 3 / 5
   Animation Systems
=================================================== */



/* ======================================
   SCROLL REVEAL SYSTEM
====================================== */


function initScrollReveal(){


const elements =
document.querySelectorAll(`

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

`);




if(!elements.length)
return;





elements.forEach(
(element)=>{


element.classList.add(
"reveal"
);


});







const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(
entry.isIntersecting
){


entry.target.classList.add(
"active"
);



observer.unobserve(
entry.target
);



}



});


},
{

threshold:
0.15

}

);






elements.forEach(
(element)=>{


observer.observe(
element
);



});



}




initScrollReveal();









/* ======================================
   NUMBER COUNTER SYSTEM
====================================== */


function animateCounter(
counter
){


const target =
Number(
counter.dataset.target
);



if(
!target
)
return;



let current = 0;


const speed =
target / 120;






function update(){


current += speed;




if(
current < target
){


counter.textContent =
Math.floor(
current
);



requestAnimationFrame(
update
);



}else{


counter.textContent =
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




if(
!counters.length
)
return;






const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(
entry.isIntersecting &&
!entry.target.dataset.done
){


entry.target.dataset.done =
"true";



animateCounter(
entry.target
);



}



});


},
{

threshold:
0.7

}

);






counters.forEach(
(counter)=>{


observer.observe(
counter
);



});



}




initCounters();









/* ======================================
   CARD HOVER EFFECT
====================================== */


function initCardAnimation(){


const cards =
document.querySelectorAll(`

.program-card,
.why-card,
.experience-card,
.testimonial,
.stat,
.method-card

`);





cards.forEach(
(card)=>{


card.addEventListener(
"mouseenter",
()=>{


card.classList.add(
"hovered"
);



});





card.addEventListener(
"mouseleave",
()=>{


card.classList.remove(
"hovered"
);



});



});



}




initCardAnimation();









/* ======================================
   FAQ ACCORDION SYSTEM
====================================== */


function initFAQ(){


const items =
document.querySelectorAll(
".faq-item"
);





if(
!items.length
)
return;






items.forEach(
(item)=>{


const question =
item.querySelector(
".faq-question"
);




if(!question)
return;






question.addEventListener(
"click",
()=>{



items.forEach(
(other)=>{


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
   ACTIVE SECTION OBSERVER
====================================== */


function initActiveSections(){


const sections =
document.querySelectorAll(
"section[id]"
);



const links =
document.querySelectorAll(
".nav-links a"
);





if(
!sections.length ||
!links.length
)
return;







const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(
entry.isIntersecting
){


links.forEach(
(link)=>{


link.classList.remove(
"active"
);



if(
link.getAttribute("href")
===
"#"+entry.target.id
){


link.classList.add(
"active"
);



}



});



}



});


},
{

threshold:
0.5

}

);





sections.forEach(
(section)=>{


observer.observe(
section
);



});



}




initActiveSections();









console.log(
"✨ Part 3 Animation Loaded"
);

   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0 FIXED

   PART 4 / 5
   Multi Language + Forms
=================================================== */



/* ======================================
   LANGUAGE SELECTOR
====================================== */

function initLanguageSelector(){

const selector =
document.querySelector(
".language-selector"
);

const menu =
document.querySelector(
".language-menu"
);

if(!selector || !menu) return;

selector.addEventListener(
"click",
(e)=>{

e.stopPropagation();

menu.classList.toggle(
"active"
);

});

document.addEventListener(
"click",
()=>{

menu.classList.remove(
"active"
);

});

}

initLanguageSelector();





/* ======================================
   ACTIVE LANGUAGE BUTTON
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
   CHANGE LANGUAGE
====================================== */

const originalChangeLanguage =
changeLanguage;

changeLanguage=function(lang){

originalChangeLanguage(lang);

updateLanguageButtons(lang);

translateForm(lang);

};






/* ======================================
   FORM TRANSLATIONS
====================================== */

function translateForm(lang){

const placeholders={

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



const data =
placeholders[lang];

if(!data) return;



const map={

childName:data.child,
parentName:data.parent,
email:data.email,
phone:data.phone,
message:data.message

};



Object.keys(map).forEach(id=>{

const el =
document.getElementById(id);

if(el){

el.placeholder=
map[id];

}

});

}






/* ======================================
   LANGUAGE CHANGE ANIMATION
====================================== */

function animateLanguageChange(){

document.body.classList.add(
"language-changing"
);

setTimeout(()=>{

document.body.classList.remove(
"language-changing"
);

},350);

}



document
.querySelectorAll(".language-btn")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

animateLanguageChange();

});

});






/* ======================================
   BOOKING FORM
====================================== */

function initBookingForm(){

const form =
document.querySelector(
"#bookingForm"
);

if(!form) return;

form.addEventListener(
"submit",
(e)=>{

e.preventDefault();

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

alert(
"Please fill all required fields."
);

return;

}

alert(
"Booking Submitted Successfully!"
);

form.reset();

});

}

initBookingForm();






/* ======================================
   INITIALIZE
====================================== */

const savedLanguage =
localStorage.getItem(
"kidsorra-language"
)||"en";

updateLanguageButtons(
savedLanguage
);

translateForm(
savedLanguage
);

console.log(
"🌍 Part 4 Loaded Successfully"
);
   /* ===================================================
   KIDSORRA WEBSITE
   PREMIUM SCRIPT 3.0 FIXED

   PART 5 / 5
   Final System
=================================================== */



/* ======================================
   RTL / LTR MODE
====================================== */

function updateDirectionStyle(){

const lang =
localStorage.getItem(
"kidsorra-language"
) || "en";

const rtlLanguages = [
"fa",
"ar"
];

if(rtlLanguages.includes(lang)){

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





document
.querySelectorAll(".language-btn")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

setTimeout(
updateDirectionStyle,
100
);

});

});





/* ======================================
   ACCESSIBILITY
====================================== */

function accessibilitySetup(){

document
.querySelectorAll(
"a,button,input,textarea,select"
)
.forEach(el=>{

el.addEventListener(
"focus",
()=>{

el.classList.add(
"keyboard-focus"
);

});

el.addEventListener(
"blur",
()=>{

el.classList.remove(
"keyboard-focus"
);

});

});

}

accessibilitySetup();





/* ======================================
   LAZY IMAGES
====================================== */

function lazyImages(){

document
.querySelectorAll("img")
.forEach(img=>{

if(
!img.hasAttribute("loading")
){

img.loading="lazy";

}

});

}

lazyImages();





/* ======================================
   SEO TITLE
====================================== */

function updateSEO(){

const lang =
localStorage.getItem(
"kidsorra-language"
)||"en";

const titles={

en:"Kidsorra | Smart Learning",

fa:"کیدسورا | آموزش هوشمند",

ar:"كيدسورا | التعليم الذكي",

th:"Kidsorra | Smart Kids",

zh:"Kidsorra | 儿童学习"

};

document.title =
titles[lang];

}

updateSEO();





document
.querySelectorAll(".language-btn")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

setTimeout(
updateSEO,
100
);

});

});





/* ======================================
   FORM VALIDATION
====================================== */

function validateForms(){

document
.querySelectorAll("form")
.forEach(form=>{

form.addEventListener(
"submit",
e=>{

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
"Please complete all required fields."
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
document.createElement("div");

bar.className =
"scroll-progress";

document.body.appendChild(
bar
);

window.addEventListener(
"scroll",
()=>{

const total =
document.documentElement.scrollHeight -
window.innerHeight;

const progress =
(window.scrollY/total)*100;

bar.style.width =
progress+"%";

});

}

createScrollBar();





/* ======================================
   DISABLE IMAGE DRAG
====================================== */

document
.querySelectorAll("img")
.forEach(img=>{

img.addEventListener(
"dragstart",
e=>e.preventDefault()
);

});





/* ======================================
   SITE READY
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
   SAFE ERROR HANDLER
====================================== */

window.addEventListener(
"error",
e=>{

console.warn(
"Kidsorra Error:",
e.message
);

});





console.log(
"✅ Part 5 Loaded Successfully"
);

/* ===================================================
   END OF SCRIPT
=================================================== */
