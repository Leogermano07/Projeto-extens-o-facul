const botao=document.getElementById("whatsapp");

botao.onclick=()=>{

window.open(

"https://wa.me/5511964717760",

"_blank"

);

};

const cards=document.querySelectorAll(".card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0px)";

}

});

});

cards.forEach(card=>{

card.style.opacity=0;

card.style.transform="translateY(80px)";

card.style.transition=".8s";

observer.observe(card);

});