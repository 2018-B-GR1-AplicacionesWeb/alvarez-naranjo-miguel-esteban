var arreglo = [];
arreglo = [
    1,
    "Miguel",
    false,
    null,
    new Date(),
    {
        nombre: "Juan"
    },
    [1, 2, false, true]
];

console.log(arreglo);
arreglo.push(3); //se puede añadir cualquier tipo de dato
console.log(arreglo);
arreglo.pop();
console.log(arreglo);
var arregloNumeros = [1,2,3,4,5];
arregloNumeros.splice(1, 0, 1.1); //añadir un elemento en la posicion 1 (indice) y sin eliminar elementos (0)
console.log(arregloNumeros);
arregloNumeros.splice(4, 1); //ELIMINAR UN ELEMENTO EN LA POSOCION 4
console.log(arregloNumeros);
var indiceDelNumeroDos = arregloNumeros.indexOf(2); //busca el indice del nuemero dos
console.log(indiceDelNumeroDos);
arregloNumeros.splice(indiceDelNumeroDos, 0, 1.2,1.3,1.4,1.6,1.7,1.8,1.9); //agregar varios numeros
console.log(arregloNumeros);
var indiceUnoSiete = arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);
console.log(arregloNumeros[0]);

var posicionInicialUnoUno = arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeElUnoUnoAlUnoNueve = (posicionInicialUnoNueve - posicionInicialUnoUno + 1);
arregloNumeros.splice(posicionInicialUnoUno, desdeElUnoUnoAlUnoNueve);

console.log(arregloNumeros);

var arregloUno = [1,2,3];
var arregloDos = [4,5,6];

//Destructuracion de Arreglos
console.log(1,2,3);
console.log(...arregloUno); //el arreglo se destructura, se elimina los brackets

var arregloCompleto = [arregloUno, arregloDos];
console.log(arregloCompleto); //se unen los dos arreglos
arregloCompleto = [...arregloUno, ...arregloDos]; //al destructurar se juntan los arreglos
console.log(arregloCompleto);
//Destructuracion de Objetos
var miguel = {
    nombre: "Miguel",
    apellido: "Alvarez",
    direccion: "Av. maldonado",
    casado: false,
    edad: 21
};

var vicente = {
    mascota:{
        nombre: "cachetes"
    },
    fechaNacimiento: new Date('1989-06-10')
};

var datosDelUsuarios = {
    ...miguel,
    ...vicente
};

//console.log(...miguel); // error
console.log(datosDelUsuarios); //se copia los datos de miguel

//OBJETOS
var atributosDelObjeto = Object.keys(datosDelUsuarios);

console.log(atributosDelObjeto);
console.log(datosDelUsuarios['nombre']);
console.log(datosDelUsuarios[atributosDelObjeto[0]]);