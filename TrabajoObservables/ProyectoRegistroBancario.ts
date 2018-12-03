import {Promise} from 'es6-promise'
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

const preguntaMenu = {
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

const preguntaUsuario = [
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
            } else {
                return 'El saldo debe ser un numero con dos decimales';
            }
        }




    },
];

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID Usuario: ',
    }
];

const preguntaEliminarPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el usuario que quiere eliminar? ',
    }
];

const preguntaBuscarNombreUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre de Usuario a Buscar: ',
    }
];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre? '
    },
];

function main() {
    console.log('*************Bienvenido**************');

    inicializarBase()
        .pipe(
            mergeMap( // preguntar opcion
                (respuestaBDD: RespuestaBDD) => {
                    return preguntarMenu()
                        .pipe(
                            map(
                                (respuesta: OpcionesPregunta) => {
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestaBDD
                                    }

                                }
                            )
                        )
                }
            ), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    console.log(respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu) {
                        case 'Crear':
                            return rxjs
                                .from(inquirer.prompt(preguntaUsuario))
                                .pipe(
                                    map(
                                        (usuario) => {
                                            respuesta.usuario = usuario;
                                            return respuesta
                                        }
                                    )
                                );

                        case 'Buscar':
                            return rxjs
                                .from(inquirer.prompt(preguntaBuscarNombreUsuario))
                                .pipe(
                                    mergeMap( // RESP ANT OBS
                                        (respuestaBuscar: BuscarUsuarioPorNombre) => {
                                            const usuarioEncontrado = respuesta.respuestaBDD.bdd.usuarios
                                                .find(
                                                    (usuario)=>{
                                                        return usuario.nombre === respuestaBuscar.nombre;
                                                    }
                                                )
                                            respuesta.usuario = usuarioEncontrado;
                                            return rxjs.of(respuesta);
                                        }
                                    )
                                );

                        default:
                            respuesta.usuario = {
                                id: null,
                                nombre: null,
                                password: null,
                                tipoLista: null,
                                saldo: null
                            };
                            rxjs.of(respuesta)

                    }
                }
            ), // Ejecutar Accion
            map(
                (respuesta: RespuestaUsuario) => {
                    console.log('respuesta en accion', respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu) {
                        case 'Crear':
                            const usuario = respuesta.usuario;
                            respuesta.respuestaBDD.bdd.usuarios.push(usuario)
                            return respuesta;

                    }
                }
            ), // Guardar Base de Datos
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                }
            )
        )
        .subscribe(
            (mensaje) => {
                console.log(mensaje);
            },
            (error) => {
                console.log(error);
            }, () => {
                console.log('Completado');
                main();
            }
        )


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

    const leerBDD$ = rxjs.from(leerBDD());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBDD())
                    }
                }
            )
        );


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
    return rxjs.from(inquirer.prompt(preguntaMenu))
}


function leerBDD(){
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'Base de datos vacia',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'Si existe la Base',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }

                }
            );
        }
    );
}

function crearBDD() {
    const contenidoInicialBDD = '{"usuarios":[]';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                contenidoInicialBDD,
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error creando Base',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD creada',
                            bdd: JSON.parse('{"usuarios":[]}')
                        });
                    }

                }
            )

        }
    )
}

function guardarBase(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando BDD',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada'
                        })
                    }
                }
            )
        }
    );
}


function anadirUsuario(usuario) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);


                        bdd.usuarios.push(usuario);


                        fs.writeFile(
                            'bdd.json',
                            JSON.stringify(bdd),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'Usuario Creado'});
                                }
                            }
                        );
                    }
                });
        }
    );
}

function editarUsuario(nombre, nuevoNombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);


                        const indiceUsuario = bdd.usuarios
                            .findIndex(
                                (usuario) => {
                                    return usuario.nombre = nombre;
                                }
                            );

                        bdd.usuarios[indiceUsuario].nombre = nuevoNombre;


                        fs.writeFile(
                            'bdd.json',
                            JSON.stringify(bdd),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'Usuario Editado'});
                                }
                            }
                        );
                    }
                });
        }
    );
}

function buscarUsuarioPorNombre(nombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);

                        const respuestaFind = bdd.usuarios
                            .find(
                                (usuario) => {
                                    return usuario.nombre === nombre;
                                }
                            );

                        resolve(respuestaFind);
                    }
                });
        }
    );
}

main();


interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface BaseDeDatos {
    usuarios: Usuario[] | any;
}

interface Usuario {
    id: number;
    nombre: string;
    password: string;
    tipoLista: string;
    saldo: number;
}

/*interface Mascota {
    id: number;
    nombre: string;
    idUsuario: number;
}*/

interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestaBDD: RespuestaBDD
    usuario?: Usuario
}

interface BuscarUsuarioPorNombre {
    nombre: string;
}