"use strict";
exports.__esModule = true;
var rxjs = require('rxjs');
var inquirer = require('inquirer');
var fs = require('fs');
var arregloDeJson = [];
var OpcionesFormulario_1 = require("./OpcionesFormulario");
console.log('---------------------------------------------------\n');
console.log('****BIENVENIDO AL REGISTRO DE CUENTAS BANCARIAS****\n');
console.log('---------------------------------------------------\n');
inquirer
    .prompt(OpcionesFormulario_1.opciones)
    .then(function (answers) {
    if (answers.opcionesPrincipales === 'Crear Cuenta') {
        inquirer
            .prompt(OpcionesFormulario_1.crearCuentaFormulario)
            .then(function (answersFormulario) {
            console.log(JSON.stringify(answersFormulario, null, ''));
            console.log('********************');
            console.log(answersFormulario);
            //guardarEnArchivo('jsonUsuarios.json', JSON.stringify(answersFormulario, null, ''))
            nuevaPromesaLectura
                .then(function (contenidoArchivo) {
                console.log('Todo bien', contenidoArchivo);
                return nuevaPromesaEscritura(contenidoArchivo, JSON.stringify(answersFormulario, null, ''));
            })
                .then(function (contenidoCompleto) {
                console.log('USUARIO REGISTRADO', contenidoCompleto);
            })["catch"](function (resultadoError) {
                console.log('Algo malo paso', resultadoError);
            });
        });
    }
    if (answers.opcionesPrincipales === 'Salir') {
        console.log('HASTA LUEGO! :) ');
    }
});
var guardarEnArchivo = function (nombreDelArchivo, datos) {
    fs.writeFile(nombreDelArchivo, datos, function (error) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            }
            else {
                resolve('USUARIO CREADO');
            }
        });
    });
};
var nuevaPromesaLectura = new Promise(function (resolve) {
    fs.readFile('jsonUsuarios.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve(err);
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var nuevaPromesaEscritura = function (contenidoLeido, datos) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datos : datos;
        fs.writeFile('jsonUsuarios.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
