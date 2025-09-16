//Semana 2 – ES6+, Clases y Estructuras Avanzadas (Días 8–14): 

// Día 8: Crear una clase Timer que reciba segundos y tenga método format (como tu último reto).

// 1. Crea una clase llamada Timer que:

// 🔹Reciba en el constructor un número de segundos.

// 🔹Guarde ese valor como propiedad interna (ej. this.seconds).

// 🔹Tenga un método format() que convierta los segundos en una cadena legible en formato:

//      🔹"dd:hh:mm:ss" → siempre con 2 dígitos por cada parte, excepto para los días (ejemplo: 520:01:05:09).

// 2. Asegúrate de:

// 🔹Usar padStart o similar para rellenar con ceros a la izquierda.

// 🔹Manejar correctamente horas mayores a 24 si las hubiera (es decir, no las recortes, déjalas crecer).

// 🔹Crea al menos 3 instancias de Timer con segundos distintos (por ejemplo, 59, 600, 3661) y muestra en consola su formato.

class Timer {
    constructor(seconds){
        this.seconds = seconds;
    }

    format(){
        let formato = ["00", "00", "00", "00"];
        let hours = 0;
        let minutes = 0;

        const rute = [86400, 3600, 60, 1]

        let rest = this.seconds;

        for(let i = 0; i < formato.length; i++){
            formato[i] = String(Math.floor(rest / rute[i])).padStart(2, 0);
            rest -= rute[i] * (rest / rute[i]);
        }

        /*
        for(let i = this.seconds; this.seconds > 0; i--){
            if(this.seconds >= 86400){
                formato[0] = String(Math.floor(this.seconds / 86400));
                this.seconds -= 86400
            }
            else if(this.seconds >= 3600  && this.seconds <= 86399){
                console.log(this.seconds)
                hours++;
                formato[1] = String(Math.floor(this.seconds / 3600)).padStart(2, 0);
                this.seconds -= 3600
            }
            else if(this.seconds > 59 && this.seconds < 3600){
                minutes++;
                formato[2] = String(Math.floor(minutes)).padStart(2, 0);
                this.seconds -= 60;
            }
            else if(this.seconds < 60){
                formato[3] = String(Math.floor(this.seconds)).padStart(2, 0);
                this.seconds -= this.seconds
            }
        }     */
        return formato.join(":"); // esperado: 1 dia 22 horas 44 segundos 
    }
};

// const t1 = new Timer(59);
// const t2 = new Timer(3600);
// const t3 = new Timer(58);
// const t4 = new Timer(83222);
const t5 = new Timer(166444);

// console.log(t1.format());
// console.log(t2.format());
// console.log(t3.format());
// console.log(t4.format());
console.log(t5.format());