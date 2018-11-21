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
        message: 'Cual es tu nombre'
    },
];

const preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];


const preguntaUsuarioNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];

function main() {
    console.log('Empezo');

    inicializarBase()
        .pipe(
            preguntarOpcion(), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
        )
        .pipe(
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
                                )
                                .catch(

                                );

                        default:
                            respuesta.usuario = {
                                id: null,
                                nombre: null
                            };
                            rxjs.of(respuesta)

                    }
                }
            )
        )
        .pipe(
            // Ejecutar Accion
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

        )
        .pipe(
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


function preguntarOpcion(){
    return mergeMap( // preguntar opcion
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
    )
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


function leerBDD(): Promise<RespuestaBDD> {
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
    const contenidoInicialBDD = '{"usuarios":[],"mascotas":[]}';
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
                            bdd: JSON.parse('{"usuarios":[],"mascotas":[]}')
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
    usuarios: Usuario[];
    mascotas: Mascota[];
}

interface Usuario {
    id: number;
    nombre: string;
}

interface Mascota {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestaBDD: RespuestaBDD
    usuario?: Usuario
}
/* const respuesta = await inquirer.prompt(preguntaMenu);
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
    } catch (e) {
        console.log('Hubo un error');
    }*/