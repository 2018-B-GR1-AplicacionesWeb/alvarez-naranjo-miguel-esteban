var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var nombreDelArchivo = 'bdd.json';
var preguntaMenu = {
    type: 'list', name: 'opcionMenu', message: '¿Qué quieres hacer?', choices: ['Crear', 'Borrar', 'Buscar', 'Actualizar',]
};
var preguntaUsuario = [
    { type: 'input', name: 'id', message: 'Cual es tu id' },
    { type: 'input', name: 'nombre', message: 'Cual es tu nombre?' },
    { type: 'password', message: 'Cree una contraseña', name: 'clave', mask: '*',
        validate: function (value) {
            if (/\w/.test(value) && /\d/.test(value)) {
                return true;
            }
            return 'La contraseña requiere por lo menos una letra o un número';
        }
    },
    { type: 'list', name: 'tipoCuenta', message: '¿Qué tipo de cuenta desea crear?: ', choices: ['Cuenta de Ahorro', 'Cuenta de Crédito'] },
    { type: 'input', name: 'saldo', message: 'Ingrese saldo a su cuenta: ',
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
    { type: 'input', name: 'idUsuario', message: 'Ingrese ID Usuario: ' }
];
var preguntaEliminarPorNombre = [
    { type: 'input', name: 'nombre', message: '¿Cuál es el usuario que quiere eliminar? ' }
];
var preguntaBuscarNombreUsuario = [
    { type: 'input', name: 'nombre', message: 'Ingrese nombre de Usuario: ' }
];
var preguntaEdicionUsuario = [
    { type: 'input', name: 'nombre', message: 'Cual es el nuevo nombre? ' },
    { type: 'input', name: 'saldo', message: 'Ingrese saldo actualizado: ',
        validate: function (value) {
            var RE = /^\d*(\.\d{1})?\d{0,1}$/;
            if (RE.test(value)) {
                return true;
            }
            else {
                return 'El saldo debe ser un numero con dos decimales';
            }
        }
    }
];
function inicializarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreDelArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(nombreDelArchivo, '{"usuarios":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'ERROR AL CREAR BASE',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse('{"usuarios":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD LEÍDA',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    var respuestaBDD$ = rxjs.from(inicializarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), menuDeOpciones(), guardarBaseDeDatos())
        .subscribe(function (data) {
        // console.log(data);
    }, function (error) {
        console.log(error);
    }, function () {
        main();
        // console.log('Complete');
    });
}
main();
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario)) //**************//
                    .pipe(map(function (usuario) {
                    respuestaBDD.usuario = usuario;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return buscarPorNombre(respuestaBDD);
                break;
            case 'Actualizar':
                return preguntarPorIDUsuario(respuestaBDD);
            case 'Borrar':
                return eliminarPorNombreUsuario(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // console.log(respuestaBDD.bdd);
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function menuDeOpciones() {
    return map(// respuesta del anterior observable
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var cliente = respuestaBDD.usuario;
                respuestaBDD.bdd.usuarios.push(cliente);
                console.log('Usuario registrado:\n');
                return respuestaBDD;
            case 'Actualizar':
                var indice = respuestaBDD.idUsuario;
                respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                console.log('Usuario actualizado\n', respuestaBDD.bdd.usuarios[indice].nombre);
                return respuestaBDD;
            case 'Buscar':
                // console.log(respuestaBDD.bdd)
                if (respuestaBDD.usuario) {
                    console.log('Usuario:\n', respuestaBDD.usuario);
                }
                else {
                    console.log('Usuario no Encontrado en la Base de Datos');
                }
                return respuestaBDD;
            case 'Borrar':
                console.log('Usuario Eliminado:', respuestaBDD.bdd.usuarios);
                return respuestaBDD;
        }
    });
}
function preguntarPorIDUsuario(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario)) //*********************
        .pipe(mergeMap(// respuesta del anterior observable
    function (respuesta) {
        var idDelUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        function (usuario) {
            console.log(usuario);
            return usuario.id === respuesta.idUsuario;
        });
        if (idDelUsuario === '-1') {
            console.log('El id no existe, Intente nuevamente \n');
            return preguntarPorIDUsuario(respuestaBDD);
        }
        else {
            respuestaBDD.idUsuario = idDelUsuario;
            return rxjs
                .from(inquirer.prompt(preguntaBuscarNombreUsuario)) //***********************
                .pipe(map(function (nombre) {
                respuestaBDD.usuario = {
                    id: null,
                    nombre: nombre.nombre,
                    tipoCuenta: null,
                    saldo: null,
                    password: null
                };
                return respuestaBDD;
            }));
        }
    }));
}
function buscarPorNombre(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreUsuario)) //*********************
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var clienteEncontrado = respuestaBDD.bdd.usuarios
            .find(function (cliente) {
            return cliente.nombre === respuesta.nombre;
        });
        respuestaBDD.usuario = clienteEncontrado;
        return rxjs.of(respuestaBDD);
    }));
}
function eliminarPorNombreUsuario(respuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarPorNombre)) //***************************
        .pipe(mergeMap(function (respuesta) {
        var indiceDelNombre = respuestaBDD.bdd.usuarios.findIndex(function (cliente) {
            return cliente.nombre === respuesta.nombre;
        });
        //console.log(indiceDelNombre)
        if (indiceDelNombre === -1) {
            console.log('No existe el usuario en la base de datos\n');
        }
        else {
            var resultadoSplice = respuestaBDD.bdd.usuarios.splice(indiceDelNombre, 1);
        }
        return rxjs.of(respuestaBDD);
    }));
}
