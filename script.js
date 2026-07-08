// =====================================
// KIDSORRA WEBSITE
// Animation Controller
// Version 1.0
// =====================================


document.addEventListener("DOMContentLoaded", function(){


console.log("Welcome to Kidsorra World 🌈");


// Hero animation starter

const hero = document.querySelector(".hero");


if(hero){

hero.style.opacity = "0";


setTimeout(()=>{

hero.style.transition="1s ease";

hero.style.opacity="1";


},300);


}


// Button interaction

const buttons = document.querySelectorAll("button");


buttons.forEach(button=>{


button.addEventListener("click",()=>{


console.log("Kidsorra button clicked ⭐");


});


});



});


const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText="0";

const updateCounter=()=>{

const target=+counter.getAttribute("data-target");

const current=+counter.innerText;

const increment=target/120;

if(current<target){

counter.innerText=Math.ceil(current+increment);

setTimeout(updateCounter,20);

}else{

counter.innerText=target;

}

}

updateCounter();

});
