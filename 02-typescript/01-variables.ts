// 02-typescript/01-variables.ts
//sudo npm install –g typescript
const nombre:string='miguel';
const edad:number=12;
const nada=null;
const casado:boolean=false;
let loQueSea:any = {};
loQueSea = 1;
loQueSea = 'Facil';
loQueSea = true;
const fechaNacimiento:Date = new Date();
let identificador: number | string = '1';
identificador = 'uno';
identificador = 1;
//identificador = false;

// tsc nombreArchivo --target es3
interface UsuarioInterface {
    nombre:string;
    apellido:string;
    edad?:number|string;

}
class Usuario{
    public nombre:string;
    public apellido:string;
    public edad?:number|string;
}
const usuario:Usuario = {
    nombre:'Miguel',
    apellido:'Alvarez'
};
usuario.edad = '2';
function sumarDosNumeros(
    numeroUno:number,
    numeroDos:number
){
    return numeroUno+numeroDos;
}
sumarDosNumeros(32,2345467890);
const saludar = (nombre:string,
                 apellido?:string,
                 ...infinito:number[]): any=>{ //necesariamente necesito poner los parentesis en typescript
    return 2345;
};
const respuesta = <string> saludar('nombre', 'alvarez',8,86,6,688);
//respuesta = respuesta.toUpperCase();
let nombreDos = 'miguel';




