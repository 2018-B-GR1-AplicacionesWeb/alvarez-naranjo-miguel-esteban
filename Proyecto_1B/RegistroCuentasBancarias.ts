const rxjs = require('rxjs');
const inquirer = require('inquirer');
const fs = require('fs');
declare var Promise:any;
let arregloDeJson = [];
import {opciones, crearCuentaFormulario} from './OpcionesFormulario'
console.log('---------------------------------------------------\n');
console.log('****BIENVENIDO AL REGISTRO DE CUENTAS BANCARIAS****\n');
console.log('---------------------------------------------------\n');

inquirer
    .prompt(opciones)
    .then(answers => {
        if(answers.opcionesPrincipales === 'Crear Cuenta'){
            inquirer
                .prompt(crearCuentaFormulario)
                .then(answersFormulario =>{

                    console.log('********************');
                    console.log(answersFormulario);
                    //guardarEnArchivo('jsonUsuarios.json', JSON.stringify(answersFormulario, null, ''))
                    nuevaPromesaLectura
                        .then(
                            (contenidoArchivo) => {
                                console.log('contenido leido\n', contenidoArchivo);

                                contenidoArchivo.split('\n').map(function(linea){
                                    if(linea!==''){
                                        arregloDeJson.push(JSON.parse(linea));
                                    }
                                });
                                return nuevaPromesaEscrituraTXT(contenidoArchivo, JSON.stringify(answersFormulario)+'\n');



                            }
                        )
                        .then(
                            async (contenidoCompleto) => {
                                console.log('USUARIO REGISTRADO', contenidoCompleto);
                                return await nuevaPromesaEscritura(JSON.stringify(arregloDeJson, null, ''));
                            }
                        )
                        .catch(
                            (resultadoError) => {
                                console.log('Error...\n', resultadoError);
                            }
                        );
                });
        }
        if(answers.opcionesPrincipales === 'Salir'){
            console.log('HASTA LUEGO! :) ')
        }

    });



/*const guardarEnArchivo = (nombreDelArchivo, datos) =>{
    fs.writeFile(nombreDelArchivo,datos,
        (error)=> {
            return new Promise(
                (resolve,reject)=>{
                    if(error){
                        reject(error)
                    }else {
                        resolve ('USUARIO CREADO')
                    }
                }
            )
        });
}*/

const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('Usuarios.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (datos) => {
    return new Promise(
        (resolve, reject) => {

            //const contenido = contenidoLeido ? contenidoLeido + datos : datos;

            fs.writeFile('jsonUsuarios.json', datos,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(datos);
                    }
                });
        }
    );
};

const nuevaPromesaEscrituraTXT = (contenidoLeido, datos) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + datos : datos;

            fs.writeFile('Usuarios.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

