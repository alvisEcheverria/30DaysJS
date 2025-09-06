//Semana 1 – Arrays, Objetos y Lógica Básica (Días 1–7)

const separator = "---------------------------------------------------------------------------------------------------"

//Día 1: Crear un array de 10 números y devolver el mayor, menor y promedio.

const number = [1, 3, 4, 6, 8, 22, 10, 2, 26, 30];

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

console.log({
    name,
    edad,
    hobbies: {
        primero,
        segundo,
        tercero,
    },
    hobbiesMap: [...hobbies]
});

function presentarUsuario({ nombre = "unnamed", edad = 23, hobbies =  [] }) {
    return `${ nombre } (${ edad }) — hobbies: ${ hobbies?.length ? hobbies.join(", ") : "loose" }`
};

console.log(presentarUsuario(usuario));
console.log(separator);

//Día 3: Filtrar un array de objetos (usuarios) por edad mayor a 18.


const usuarios = [
  { nombre: "Ana", edad: 17 },
  { nombre: "Luis", edad: 18 },
  { nombre: "Marta", edad: 21 },
  { nombre: "Pepe", edad: "20" },   // string numérico
  { nombre: "Sofía" },              // sin edad
  { nombre: "Iván", edad: null },
  { nombre: "Zoe", edad: 0 },
  { nombre: "Raúl", edad: 19.5 },   // no entero
  { nombre: "Gus", edad: -3 },
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

const accumulatedResult = values.reduce((accumulator, currentValue) => {

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

console.log(accumulatedResult);
console.log(separator);

// Día 6: Crear una función que reciba un string y devuelva cuántas veces aparece cada letra.

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