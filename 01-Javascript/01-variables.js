// lenguajes tipados Int edad = 1;
// en javascript
var edad = 1; // number
var sueldo = 1.01; //number
var nombre = "Miguel"; //String
var nombre2 = 'Miguel'; //string
var nombre3 = `Miguel`; // String
var casado = false; // boolean
var hijos = null; // object
var cuatroBrazos; //undefined
var fecha = new Date(); // las calses en javascript no se heredan
var MiguelJson = {
    "nombre": "Miguel",
    "edad": 21,
    "sueldo": 12.2,
    "casado": false,
    "hijos": null,
    "mascota":{
        "nombre": "cachetes"
    }

}; // object
var miguel = {
    'nombre' : 'Miguel',
    edad: 29,
    sueldo: 12.2,
    casado: false,
    hijos: null,
    deberes: undefined,
    mascota: {
        nombre: 'cachetes'
    },
}

console.log("Hola Mundo!!!");

console.log("edad es de tipo ", typeof edad);
console.log("sueldo es de tipo ", typeof sueldo);
console.log("nombre es de tipo ", typeof nombre);
console.log("nombre2 es de tipo ", typeof nombre2);
console.log("nombre3 es de tipo ", typeof nombre3);
console.log("casado es de tipo ", typeof casado);
console.log("hijos es de tipo ", typeof hijos);
console.log('cuatroBrazos', cuatroBrazos); //undefined
console.log('cuatroBrazos es de tipo ', typeof cuatroBrazos); //undefined
console.log('fecha es de tipo ', fecha ,typeof fecha);
console.log(miguel.nombre);
//truthy son los strings, el uno, el -1, cualquier numero menos el 0
//falsy el 0 es falsy, null, undefined
if(""){
    console.log("Si");
} else{
    console.log("No");
}
if(null){
    console.log("Si");
} else{
    console.log("No");
}
if(new Date()){
    console.log("Si");
} else{
    console.log("No");
}
if(undefined){
    console.log("Si");
} else{
    console.log("No");
}
