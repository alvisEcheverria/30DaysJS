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

//Sí el usuario no tiene edad, ¿es inmortal?
usuarios.forEach(({edad}, index)=> {

    if(edad === undefined){
        usuarios[index].edad = Infinity;
    };
    
});

function filtrarMayores(users, min = 18){

    //Acepto números decimales, enteros, string y negativos, siempre que sean mayores a 18.
    //Convierto string númericos con +, me aseguro de tomar los negativos convirtiendolos en valores absolutos.

    const absoluteValue = (number)=> Math.abs(+number);

    return min >= 18 ?
        { mayores: users.filter(({edad}) => absoluteValue(edad) >= 18).sort((a, b) => absoluteValue(b.edad) - absoluteValue(a.edad))}
        :
        { menores: users.filter(({edad}) => absoluteValue(edad) < 18 && edad !== null).sort((a, b) => absoluteValue(b.edad) - absoluteValue(a.edad)) }
};

console.log( filtrarMayores(usuarios))