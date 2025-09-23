import cT from "../../ES6_Clases_y_Estructuras_Avanzadas.js";

const p = document.getElementsByTagName("p")[0];
const button = document.getElementsByTagName("button")[0];

p.style.fontSize = "6vw";
p.innerText =  cT.status();

button.innerText = "Decrease";

const intervalId = setInterval(() => {
    cT.tick();
    p.innerText = cT.status();
    if(cT.seconds <= 0) clearInterval(intervalId);
}, 1000);

document.addEventListener("click", ()=>{
    cT.tick();
    p.innerText = cT.status();
});

 