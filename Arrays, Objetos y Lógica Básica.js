//Semana 1 – Arrays, Objetos y Lógica Básica (Días 1–7)

//Día 1: Crear un array de 10 números y devolver el mayor, menor y promedio.

const number = [1, 3, 4, 6, 8, 22, 10, 2, 26, 30];

//Mayor:

const MAX = Math.max(...number);

//Menor:

const MIN = Math.min(...number);

//Promedio: 
const average = number.reduce((acc, el) => acc + el, 0) / number.length; 

console.log({ MAX, MIN, average });

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

// Día 6: Crear una función que reciba un string y devuelva cuántas veces aparece cada letra.

// Reto Día 6

// Crea una función que reciba un string cualquiera y devuelva un objeto donde las claves sean las letras y los valores la cantidad de veces que aparece cada letra en el string.

// 🔹 Condiciones del reto:

// No ignores mayúsculas/minúsculas (es decir "A" y "a" cuentan como letras diferentes).

// Ignora los espacios " ".

// Usa solo lo que ya sabes: bucles, reduce, split, map o lo que quieras.

// No uses librerías externas, solo JS nativo.

// Extra Challenge Día 6

// Extiende la función para que el resultado:

// Devuelva las letras ordenadas alfabéticamente.

// También incluya un contador total de caracteres analizados (sin contar espacios).

// Extra Hardcore Challenge Día 6

// Mejora la función para que:

// Ignore mayúsculas/minúsculas (case-insensitive).

// "Hola" y "hola" cuentan como lo mismo.

// Ignore espacios y signos de puntuación (.,!?¿¡:;-"()[]{}...).

// Solo se cuentan letras reales.

// Devuelva las letras ordenadas alfabéticamente.

// Incluya el total de letras válidas analizadas.


