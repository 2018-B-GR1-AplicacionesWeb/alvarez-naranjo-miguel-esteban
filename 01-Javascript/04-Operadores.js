
function ejemplo() {
}
var ejemploDos = function () { //se tiene acceso a la variable, el nombre de la funcion no es importante

} //se le conoce como funciones anonimas porque no tienen nombre
//las funciones no necesitan terminar en ';'

console.log(typeof ejemploDos);
console.log(typeof ejemplo); //tambien existe el tipo de dato function en javascript
console.log(ejemplo); // definicion de la funcion
console.log(ejemplo()); //ejecucion funcion
//FUNCIONES ANONIMAS
var miguel = {
    trabajar:function () {
        return 'trabajando';
    }
};

var arregloFunciones = [function () {// anonymus function

}];

/*function (a, b, c) {
    
}no se puede usar una funcion anonima sin igualar o mandar como parametro*/

var variableUno; // nunca usar estas variables  con la palabra VAR
let variableDos; //USAR cuando es MUTABLE (este se asigna a otro valor)

const pi = 3.141592; //Intentar usar CONST siempre





// OPERADORES

const arregldoDeNombres = ['A', 'b', 'C']
arregldoDeNombres[1] = 'B';
/*arregldoDeNombres = {};
arregldoDeNombres = [];no se puede */
arregldoDeNombres.push('D');

const vicente = {
    nombre:'vicente'
};



vicente.nombre = 'Miguel';
vicente.edad = 24;

const casado = false;
//casado = true; no se puede cambiar booleanos
const apellido = '';
//apellido = '5asdf'; no se puede cambiar strings
const edad = 21;
//edad = 35; no se puede cambiar Number

const variableNull = null;
//variableNull = 1; no se puede modificar el tipo de dato Null

console.log(arregldoDeNombres)
console.log(vicente);

arregldoDeNombres.forEach( //Escribir codigo que se entienda
    function (valorActual, indiceActual, arreglo){
        console.log('valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);


//FAT ARROW FUNCIOTNS
arregldoDeNombres.forEach( //Escribir codigo que se entienda
    (valorActual, indiceActual, arreglo) =>{ // UTILIZAR LAS FAT ARROW FUNCTIONS EN LUGAR DE LAS FUNCIONES ANONIMAS
        console.log('valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);

const sumarDosNuemros = (numeroUno, numeroDos)=>{return numeroUno+ numeroDos};

const sumarDosNumerosV2 = (numUno, numDos) => numUno+numDos;

const elevarAlCuadrado = numero => numero*numero; //cuando solo es un parametro se puede omitir los parentesis

const arregloNombresDos = ['E', 'F', 'G', 'H'];

const resultado = arregloNombresDos.map(// mutar cada elemento del arreglo, devuelve un arreglo
    valorActual =>{
        return valorActual + '.';
    }


)
    .forEach(
    (valorNuevo)=>console.log((valorNuevo))
); // undefined



console.log(resultado);

const arregloNumeros = [2, 3, 1, 5, 6, 4, 7, 8, 9, 10]
const resultadoFilter = arregloNumeros
    .filter(valorActual => (valorActual % 2)==0 //expresion

    );

console.log(resultadoFilter);

if('1' === 1){ //falso
    console.log('Es Verdad');
}else{
    console.log('Es falso')
}

//EVERY
//al igual que el filter recibe una expresion
const resultadoEvery = arregloNumeros
    .every(n => n>0);//si cumple todos devuelve TRUE caso contrario FALSE
console.log(resultadoEvery)

//SOME
//Si alguno cumple es verdadero, caso contraro es falso
const resultadoSome = arregloNumeros
    .some(n => n < 0);
console.log(resultadoSome)

// findIndexOf
const resultadofindIndex = arregloNumeros
    .findIndex(n => n === 7);
arregloNumeros.indexOf(7);
console.log(resultadofindIndex);
console.log(arregloNumeros.indexOf(7));

//Find
const resultadoFind = arregloNumeros
    .find(n  => n === 7);
console.log(resultadoFind)

//REDUCE

const resultadoReduce = arregloNumeros
    .reduce(
        (valorActualDelNumero, valorActualDelArreglo) =>{ //primer parametro una funcion
          return valorActualDelNumero - valorActualDelArreglo;
        },
        100 //como segundo parametro acepta un valor
    )
console.log(resultadoReduce)

const resultadoReduceV2 = arregloNumeros.reduceRight((a, b, indice)=> {
    if (indice > 4){
        return a+b;
    } else {
        return a;
    }
},0);
console.log(resultadoReduceV2)

//SORT
const clonArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros));
console.log(clonArregloNumeros);
const resultadoSort = arregloNumeros.sort((a, b)=> a - b);
console.log(resultadoSort);

const resultadoSortV2 = arregloNumeros.sort((a, b)=> b - a);
console.log(resultadoSortV2);