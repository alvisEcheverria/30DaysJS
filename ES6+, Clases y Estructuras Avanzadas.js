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
    };

    format(){
        let segments = ["00", "00", "00", "00"];
        const divisors = [86400, 3600, 60, 1];
        let remainder = this.seconds;
        
        for(let i = 0; i < segments.length; i++){
            segments[i] = String(Math.floor(remainder / divisors[i])).padStart(2, 0);
            remainder %= divisors[i];
        };

        return segments.join(":");
    };
};

const t1 = new Timer(59);
const t2 = new Timer(3600);
const t3 = new Timer(58);
const t4 = new Timer(83222);
const t5 = new Timer(166444);

// console.log(t1.format());
// console.log(t2.format());
// console.log(t3.format());
// console.log(t4.format());
// console.log(t5.format());


//Día 9: Heredar Timer para crear CountdownTimer que reste tiempo y devuelva el estado.

// 1. Crea una clase CountdownTimer que herede de Timer.

// 2. Debe recibir un número de segundos inicial (ejemplo: new CountdownTimer(10)).

// 3. Agrega un método tick() que reste 1 segundo al tiempo restante cada vez que se llama.

// 4. Agrega un método status() que devuelva un string con el tiempo restante formateado (usando el format() heredado).

// 5. Cuando llegue a 0, el status() debe devolver "Finished".

// 📌 Reglas

// Prohibido reescribir format() en CountdownTimer, tienes que reutilizar el del Timer.

// Usa herencia con extends y super.

// El estado debe depender de si aún quedan segundos o no.


class CountdownTimer extends Timer {
    tick() {
        
    };
    status() {
        if(this.seconds > 0){
            return super.format();
        }
        else{
            return "Finished";
        }
    };
};

const cT = new CountdownTimer(1509);

console.log(cT.tick());
console.log(cT.status());