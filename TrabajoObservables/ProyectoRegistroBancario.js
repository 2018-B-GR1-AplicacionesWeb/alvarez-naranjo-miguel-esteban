"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
var preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es tu nombre?'
    },
    {
        type: 'password',
        message: 'Cree una contraseña',
        name: 'clave',
        mask: '*',
        validate: function (value) {
            if (/\w/.test(value) && /\d/.test(value)) {
                return true;
            }
            return 'La contraseña requiere por lo menos una letra o un número';
        }
    },
    {
        type: 'list',
        name: 'tipoCuenta',
        message: '¿Qué tipo de cuenta desea crear?: ',
        choices: ['Cuenta de Ahorro', 'Cuenta de Crédito']
    },
    {
        type: 'input',
        name: 'saldo',
        message: 'Ingrese saldo a su cuenta: ',
        validate: function (value) {
            var RE = /^\d*(\.\d{1})?\d{0,1}$/;
            if (RE.test(value)) {
                return true;
            }
            else {
                return 'El saldo debe ser un numero con dos decimales';
            }
        }
    },
];
var preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID Usuario: '
    }
];
var preguntaEliminarPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el usuario que quiere eliminar? '
    }
];
var preguntaBuscarNombreUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre de Usuario a Buscar: '
    }
];
var preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre? '
    },
];
function main() {
    console.log('*************Bienvenido**************');
    inicializarBase()
        .pipe(mergeMap(// preguntar opcion
    function (respuestaBDD) {
        return preguntarMenu()
            .pipe(map(function (respuesta) {
            return {
                respuestaUsuario: respuesta,
                respuestaBDD: respuestaBDD
            };
        }));
    }), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
    mergeMap(function (respuesta) {
        console.log(respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map(function (usuario) {
                    respuesta.usuario = usuario;
                    return respuesta;
                }));
            case 'Buscar':
                return rxjs
                    .from(inquirer.prompt(preguntaBuscarNombreUsuario))
                    .pipe(mergeMap(// RESP ANT OBS
                function (respuestaBuscar) {
                    var usuarioEncontrado = respuesta.respuestaBDD.bdd.usuarios
                        .find(function (usuario) {
                        return usuario.nombre === respuestaBuscar.nombre;
                    });
                    respuesta.usuario = usuarioEncontrado;
                    return rxjs.of(respuesta);
                }));
            default:
                respuesta.usuario = {
                    id: null,
                    nombre: null,
                    password: null,
                    tipoLista: null,
                    saldo: null
                };
                rxjs.of(respuesta);
        }
    }), // Ejecutar Accion
    map(function (respuesta) {
        console.log('respuesta en accion', respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                var usuario = respuesta.usuario;
                respuesta.respuestaBDD.bdd.usuarios.push(usuario);
                return respuesta;
        }
    }), // Guardar Base de Datos
    mergeMap(function (respuesta) {
        return guardarBase(respuesta.respuestaBDD.bdd);
    }))
        .subscribe(function (mensaje) {
        console.log(mensaje);
    }, function (error) {
        console.log(error);
    }, function () {
        console.log('Completado');
        main();
    });
    /*
    const respuesta = await inquirer.prompt(preguntaMenu);
    switch (respuesta.opcionMenu) {
        case 'Crear':
            const respuestaUsuario = await inquirer.prompt(preguntaUsuario);
            await anadirUsuario(respuestaUsuario);
            main();
            break;
        case 'Actualizar':
            const respuestaUsuarioBusquedaPorNombre = await inquirer.prompt(preguntaUsuarioBusquedaPorNombre);
            const existeUsuario = await buscarUsuarioPorNombre(respuestaUsuarioBusquedaPorNombre.nombre);
            if (existeUsuario) {
                const respuestaNuevoNombre = await inquirer.prompt(preguntaUsuarioNuevoNombre);
                await editarUsuario(respuestaUsuarioBusquedaPorNombre.nombre, respuestaNuevoNombre.nombre);
            } else {
                console.log('El usuario no existe');
                main();
                break;
            }
    }
    */
}
function inicializarBase() {
    var leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(mergeMap(function (respuestaLeerBDD) {
        if (respuestaLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(respuestaLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD());
        }
    }));
    /*
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        fs.writeFile('bdd.json',
                            '{"usuarios":[],"mascotas":[]}',
                            (err) => {
                                if (err) {
                                    reject({mensaje: 'Error'});
                                }
                                resolve({mensaje: 'ok'});
                            });
                    } else {
                        resolve({mensaje: 'ok'});
                    }
                });
        }
    );
    */
}
function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu));
}
function leerBDD() {
    return new es6_promise_1.Promise(function (resolve) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoLeido) {
            if (error) {
                resolve({
                    mensaje: 'Base de datos vacia',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Si existe la Base',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBDD() {
    var contenidoInicialBDD = '{"usuarios":[]';
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', contenidoInicialBDD, function (err) {
            if (err) {
                reject({
                    mensaje: 'Error creando Base',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse('{"usuarios":[]}')
                });
            }
        });
    });
}
function guardarBase(bdd) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada'
                });
            }
        });
    });
}
function anadirUsuario(usuario) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                bdd.usuarios.push(usuario);
                fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Usuario Creado' });
                    }
                });
            }
        });
    });
}
function editarUsuario(nombre, nuevoNombre) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                var indiceUsuario = bdd.usuarios
                    .findIndex(function (usuario) {
                    return usuario.nombre = nombre;
                });
                bdd.usuarios[indiceUsuario].nombre = nuevoNombre;
                fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Usuario Editado' });
                    }
                });
            }
        });
    });
}
function buscarUsuarioPorNombre(nombre) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                var respuestaFind = bdd.usuarios
                    .find(function (usuario) {
                    return usuario.nombre === nombre;
                });
                resolve(respuestaFind);
            }
        });
    });
}
main();
