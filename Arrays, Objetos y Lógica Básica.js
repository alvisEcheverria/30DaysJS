//Semana 1 – Arrays, Objetos y Lógica Básica (Días 1–7)

const separator = "---------------------------------------------------------------------------------------------------"

//Día 1: Crear un array de 10 números y devolver el mayor, menor y promedio.

const number = [1, 3, 4, 6, 8, 30, 10, 2, 26, 22];

//Mayor:

const MAX = Math.max(...number);

//Menor:

const MIN = Math.min(...number);

//Promedio: 
const average = number.reduce((acc, el) => acc + el, 0) / number.length; 

console.log({ MAX, MIN, average });
console.log(separator);

//Día 2: Hacer un objeto “usuario” con nombre, edad y hobbies; imprimir sus propiedades con destructuring.

const usuario = {
    nombre: "Alvis Echeverria",
    edad: 34,
    hobbies: ["nadar", "ver anime", "gimnasio"]
};

const { nombre: name, edad = 23, hobbies } = usuario;

const [ primero = "loose", segundo = "loose", tercero = "loose", ...rest ] = usuario.hobbies;

usuario.direccion = { ciudad: "anywhere" };

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if(typeof obj[prop] === "object" && !Object.isFrozen(obj[prop])){
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
};

deepFreeze(usuario);  

function presentarUsuario({ nombre = "unnamed", edad = 23, hobbies =  [] }) {
    return `${ nombre } (${ edad }) — hobbies: ${ hobbies?.length ? hobbies.join(", ") : "loose" }`
};

console.log(presentarUsuario(usuario));
console.log(separator);

//Día 3: Filtrar un array de objetos (usuarios) por edad mayor a 18.


const usuarios = [
  { nombre: "Ana", edad: 17, hobbies: ["leer", "patinar", "fotografía"] },
  { nombre: "Luis", edad: 18, hobbies: ["fútbol", "videojuegos", "viajar"] },
  { nombre: "Marta", edad: 21, hobbies: ["pintar", "cantar"] },
  { nombre: "Pepe", edad: "20", hobbies: ["programar", "ajedrez", "running"] },   // string numérico
  { nombre: "Sofía"},                   // sin edad
  { nombre: "Iván", edad: null, hobbies: ["cocinar", "series", "gimnasio"] },
  { nombre: "Zoe", edad: 0, hobbies: ["bailar", "pintar"] },
  { nombre: "Raúl", edad: 19.5, hobbies: ["música", "fotografía", "lectura"] },   // no entero
  { nombre: "Gus", edad: -3, hobbies: ["ajedrez", "coleccionar monedas"] },
];

function filtrarMayoresYMenores(users, min = 18){

    let newUsersArray = structuredClone(users);

    try{
        if(!Array.isArray(newUsersArray)){
            //Si los datos ingresados no están almacenados en un Array, se arroja un error.
            throw new TypeError("Los usuarios deben estar en un Array.");
        } else if(typeof min !== "number" || min < 12){
             //Si los datos ingresados no son un carácter numérico, se arroja un error.
            throw new RangeError("La edad debe ser un carácter numérico y reflejar al menos 12 años.");
        } else { 
            //Añadimos null por defecto a los usuarios sin edad registrada, queremos solo trabajar con números enteros
            //por lo que nos aseguramos de que los números retornados en la función sean la edad ya cumplida por el usuario y
            //para los números negativos, también pondremos null como valor por defecto.
            newUsersArray.forEach((user)=> {
                    let edad = Number(Math.floor(user.edad ?? NaN));
                    user.edad = (isNaN(edad) || edad < 12) ? null : edad;
            }); 
            //Agregamos min al filtro para que la busqueda sea inteligente desde la edad ingresada por el usuario, sigue estando por defecto la edad de 18 años.
            const resultado = newUsersArray.filter(user => 
                user.edad !== null && (min >= 18 ? user.edad >= min : user.edad <= min)
            ).sort((a, b) => b.edad - a.edad);
            return resultado;
        }   
    } catch (error){
        return error;
    };

};

console.log(filtrarMayoresYMenores(usuarios, 17));
console.log(separator);

//Día 4: Mapear un array de strings a su longitud y convertir a mayúsculas.

const palabras = ["javascript", "map", "array", "día"];

//Podríamos hacerlo con map y simplificarlo pero en este caso como práctica, usaremos reduce.

const resultado = palabras.reduce((acc, palabra)  => {
    acc.push({
        original: palabra.toUpperCase(),
        length: palabra.length,
        isLong: palabra.length > 4
    })
    return acc;
}, []);

console.log(resultado);
console.log(separator);

//Día 5: Reducir un array de números a su suma y producto.

const values = [2, 3, 5, 7, 11];

const accumulatedResult = (numberArray)=>{
    return numberArray.reduce((accumulator, currentValue) => {
        const newSum = accumulator.runningSum + currentValue;
        const newProduct = accumulator.runningProduct * currentValue;

        return {
            runningSum: newSum,
            runningProduct: newProduct,
            steps: [
                ...accumulator.steps, 
                { runningSum: newSum, runningProduct: newProduct }
            ]
        };

    }, { runningSum: 0,  runningProduct: 1, steps: []});
}

console.log(accumulatedResult(values));
console.log(separator);

// Crear una función que reciba un string y devuelva cuántas veces aparece cada letra.

// 🔹 Condiciones del reto:

// Ignora los espacios " ".
// Ignore mayúsculas/minúsculas (case-insensitive).
// Ignore espacios y signos de puntuación (.,!?¿¡:;-"()[]{}...).
// Devuelva las letras ordenadas alfabéticamente.
// También incluya un contador total de caracteres analizados (sin contar espacios).
// Incluya el total de letras válidas analizadas.
// Devuelva las letras ordenadas alfabéticamente.
// No uses librerías externas, solo JS nativo.

const paragraph = "Haz cada cosa en la vida, como si fuera lo último que hagas.";

function counterLetters(text){
    const accentMap = { á: "a", é: "e", í: "i", ó: "o", ú: "u" };
    const validCharacters =  text.toLowerCase()
        .replace(/[áéíóú]/g, match => accentMap[match])
        .split("")
        .filter(character => /[a-z0-9]/.test(character));

    const lettersCount = validCharacters.reduce((accumulator, currentCharacter) => {
        accumulator.letters[currentCharacter] = (accumulator.letters[currentCharacter] || 0) + 1;
        return accumulator;
    }, {letters: { }});

    return {
        total: validCharacters.length,
        letters: Object.fromEntries(Object.entries(lettersCount.letters).sort())
    };
};

console.log(counterLetters(paragraph));
console.log(separator);

//Día 7: Mini reto: Combinar todos los ejercicios anteriores en una función que reciba un array de usuarios y devuelva un resumen estadístico.

// 🔹 Resumen estadístico de todo el array:

// Día 1: Calcular el mayor, menor y promedio de las edades.

// Día 2: Mostrar el nombre, edad y hobbies con destructuring.

// Día 3: Filtrar usuarios mayores de 18.

// Día 4: Mapear hobbies → su longitud y en mayúsculas.

// Día 5: Sumar y multiplicar todas las edades.

// Día 6: Contar letras de todos los nombres (puedes reutilizar tu función counterLetters).

function summaryInfo (users){

    const filterUsersByAge = users.filter(({edad}) => typeof edad === "number" && edad > 11);
    const usersForFix = users.filter((user)=> {
        if(!Object.values(user).length || user.edad < 12 || typeof user.edad !== "number"){
            return user;
        }
    });
    
    let maxAge = filterUsersByAge[0].edad;
    let minAge = filterUsersByAge[0].edad;
    const ages = filterUsersByAge.map(({edad}) => edad);

    filterUsersByAge.forEach(({edad})=> {
        let roundedAge = Math.floor(edad);

        if(minAge > roundedAge){
            minAge = roundedAge;
        }
        else if(maxAge < roundedAge){
            maxAge = roundedAge;
        }
    });

    const letters = filterUsersByAge.map(({nombre})=> {
        return {
                nombre,
                letters: counterLetters(nombre)
            }
    });

    return {
        usersFixed: {
            stats: {
                maxAge,
                minAge,
                avgAge: Math.floor(filterUsersByAge.reduce((accumulator, currentValue)=> accumulator + Math.floor(currentValue.edad), 0) / filterUsersByAge.length)
            },
            users: filterUsersByAge,
            // Esta función tiene por defecto el filtrado de mayores a partir de 18, pero puede ser usada 
            // para filtrar desde cualquier edad a partir de los 12 años, siendo esto también el minimo en la busqueda, de ahí surge el nombre.
            adults: filtrarMayoresYMenores(filterUsersByAge), 
            hobbiesTransformed: filterUsersByAge.map(({nombre, edad, hobbies}) => {
                return {
                    nombre,
                    edad,
                    hobbies: hobbies.map(hobbie => {
                        return {   
                            hobbie: hobbie.toUpperCase(),
                            longitud: hobbie.length
                        }
                    })
                }
            }), // hobbies mapeados
            math: {
                // accumulatedRestult es una función que se encarga de reducir un array de números a su suma y producto, retornando el siguiente objeto: { runningSum: 0,  runningProduct: 1, steps: []}.
                sum: accumulatedResult(ages).runningSum,
                product: accumulatedResult(ages).runningProduct
            },
            letters
        },
        usersForFix: usersForFix ?? "Felicidades, nada por hacer"
    }
}

console.dir(summaryInfo(usuarios), {depth: null});
console.log(separator);

//SEMANA 2: 

// Día 8: Crear una clase Timer que reciba segundos y tenga método format (como tu último reto).

// 1. Crea una clase llamada Timer que:

// 🔹Reciba en el constructor un número de segundos.

// 🔹Guarde ese valor como propiedad interna (ej. this.seconds).

// 🔹Tenga un método format() que convierta los segundos en una cadena legible en formato:

//      🔹"dd:hh:mm:ss" → siempre con 2 dígitos por cada parte (ejemplo: 01:05:09).

// 2. Asegúrate de:

// 🔹Usar padStart o similar para rellenar con ceros a la izquierda.

// 🔹Manejar correctamente horas mayores a 24 si las hubiera (es decir, no las recortes, déjalas crecer).

// 🔹Crea al menos 3 instancias de Timer con segundos distintos (por ejemplo, 59, 600, 3661) y muestra en consola su formato.

class Timer {
    constructor(seconds){
        this.seconds = seconds;
    }

    format(){
        
    }
}

const t1 = new Timer(59);
const t2 = new Timer(600);
const t3 = new Timer(3661);

console.log(t1.format());
console.log(t2.format());
console.log(t3.format());