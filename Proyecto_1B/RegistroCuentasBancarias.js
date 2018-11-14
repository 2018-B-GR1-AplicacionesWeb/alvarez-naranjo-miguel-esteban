"use strict";
exports.__esModule = true;
var rxjs = require('rxjs');
var inquirer = require('inquirer');
var OpcionesFormulario_1 = require("./OpcionesFormulario");
console.log('***BIENVENIDO AL REGISTRO BANCARIO***\n');
inquirer
    .prompt(OpcionesFormulario_1.opciones)
    .then(function (answers) {
    if (answers.opcionesPrincipales === 'Crear Cuenta') {
        inquirer
            .prompt(OpcionesFormulario_1.crearCuentaFormulario)
            .then(function (answersFormulario) {
            console.log(answersFormulario);
        });
    }
    if (answers.opcionesPrincipales === 'Salir') {
        console.log('HASTA LUEGO! :) ');
    }
});
