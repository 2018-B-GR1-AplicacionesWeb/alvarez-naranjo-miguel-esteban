const rxjs = require('rxjs');
const inquirer = require('inquirer');
const fs = require('fs');
declare var Promise:any;
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
                    console.log(JSON.stringify(answersFormulario, null, ''));
                    console.log('********************');
                    console.log(answersFormulario);
                    //guardarEnArchivo('jsonUsuarios.json', JSON.stringify(answersFormulario, null, ''))
                    nuevaPromesaLectura
                        .then(
                            (contenidoArchivo) => {
                                console.log('Todo bien', contenidoArchivo);
                                return nuevaPromesaEscritura(contenidoArchivo, JSON.stringify(answersFormulario, null, ''))
                            }
                        )
                        .then(
                            (contenidoCompleto) => {
                                console.log('Contenido completo', contenidoCompleto);
                            }
                        )
                        .catch(
                            (resultadoError) => {
                                console.log('Algo malo paso', resultadoError);
                            }
                        );
                });
        }
        if(answers.opcionesPrincipales === 'Salir'){
            console.log('HASTA LUEGO! :) ')
        }

    });



const guardarEnArchivo = (nombreDelArchivo, datos) =>{
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
}

const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('jsonUsuarios.json', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (contenidoLeido, datos) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + datos : datos;

            fs.writeFile('jsonUsuarios.json', contenido,
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

