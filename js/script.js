// Botão Explore

const botao = document.querySelector("button");

if(botao){

botao.addEventListener("click",()=>{

    document.querySelector(".galeria").scrollIntoView({

        behavior:"smooth"

    });

});

}

// Fade ao aparecer

const elementos = document.querySelectorAll(".galeria img,.servicos,.texto,.logo");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

});

elementos.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(50px)";
el.style.transition=".8s";

observer.observe(el);

});