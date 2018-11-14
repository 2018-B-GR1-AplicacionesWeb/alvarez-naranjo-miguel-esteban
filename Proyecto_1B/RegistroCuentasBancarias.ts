const rxjs = require('rxjs');
const inquirer = require('inquirer');
import {opciones, crearCuentaFormulario} from './OpcionesFormulario'
console.log('***BIENVENIDO AL REGISTRO BANCARIO***\n')

inquirer
    .prompt(opciones)
    .then(answers => {
        if(answers.opcionesPrincipales === 'Crear Cuenta'){
            inquirer
                .prompt(crearCuentaFormulario)
                .then(answersFormulario =>{
                    console.log(answersFormulario);
                });
        }
        if(answers.opcionesPrincipales === 'Salir'){
            console.log('HASTA LUEGO! :) ')
        }

    });