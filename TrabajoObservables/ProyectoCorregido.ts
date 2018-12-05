//declare var require;
declare var Promise;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const nombreDelArchivo = 'bdd.json';

const preguntaMenu = {
    type: 'list',name: 'opcionMenu',message: '¿Qué quieres hacer?',choices: ['Crear','Borrar','Buscar','Actualizar',]
};

const preguntaUsuario = [
    {type: 'input', name: 'id', message: 'Cual es tu id'},
    {type: 'input', name: 'nombre', message: 'Cual es tu nombre?'},
    {type: 'password', message: 'Cree una contraseña', name: 'clave', mask: '*',
        validate: function (value) {
            if (/\w/.test(value) && /\d/.test(value)) {
                return true;
            }
            return 'La contraseña requiere por lo menos una letra o un número';
        }
    },
    {type: 'list', name: 'tipoCuenta', message: '¿Qué tipo de cuenta desea crear?: ', choices: ['Cuenta de Ahorro', 'Cuenta de Crédito']},
    {type: 'input', name: 'saldo', message: 'Ingrese saldo a su cuenta: ',
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
    {type: 'input', name: 'idUsuario', message: 'Ingrese ID Usuario: '}
];

const preguntaEliminarPorNombre = [
    {type: 'input', name: 'nombre', message: '¿Cuál es el usuario que quiere eliminar? '}
];

const preguntaBuscarNombreUsuario = [
    {type: 'input', name: 'nombre', message: 'Ingrese nombre de Usuario: '}
];

const preguntaEdicionUsuario = [
    {type: 'input', name: 'nombre', message: 'Cual es el nuevo nombre? '},
];



function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreDelArchivo,
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile(
                            nombreDelArchivo,
                            '{"usuarios":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'ERROR AL CREAR BASE',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD LEÍDA',
                                        bdd: JSON.parse('{"usuarios":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );
}



function main() {
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                // console.log(data);
            },
            (error) => {
                console.log(error);
            },
            () => {
                main();
                // console.log('Complete');
            }
        )
}
main();

function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreDelArchivo,
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}

function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {
            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                        }
                    )
                );
        }
    )
}






function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))//**************//
                        .pipe(
                            map(
                                (usuario: Usuario) => { // resp ant OBS
                                    respuestaBDD.usuario = usuario;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return buscarClientePorNombre(respuestaBDD);
                    break;
                case 'Actualizar':
                    return preguntarIdCliente(respuestaBDD);
                case 'Borrar':
                    return eliminarPorNombre(respuestaBDD);
                    break;
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // console.log(respuestaBDD.bdd);
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const cliente:Usuario = respuestaBDD.usuario;
                    /*******************************************************************************>>>>>>>>>>*/
                    // console.log(respuestaBDD.bdd.clientes);
                    respuestaBDD.bdd.usuarios.push(cliente);
                    console.log('Usuario registrado:\n')
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.idUsuario;
                    respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                    console.log('Usuario actualizado\n', respuestaBDD.bdd.usuarios[indice].nombre)
                    return respuestaBDD;
                case 'Buscar':
                    // console.log(respuestaBDD.bdd)
                    console.log('Usuario:\n',respuestaBDD.usuario);
                    return respuestaBDD;
                case 'Borrar':
                    console.log('Usuario Eliminado:', respuestaBDD.bdd.usuarios);
                    return respuestaBDD;
            }
        }
    )
}

function preguntarIdCliente(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario)) //*********************
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    // console.log(respuesta);
                    const idDelUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (usuario: Usuario) => {
                                console.log(usuario);
                                return usuario.id === respuesta.idUsuario
                            }
                        );
                    if (idDelUsuario === -1) {
                        console.log('El id no existe, Intente nuevamente \n');
                        return preguntarIdCliente(respuestaBDD);
                    } else {
                        respuestaBDD.idUsuario = idDelUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaBuscarNombreUsuario))//***********************
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.usuario ={
                                            id:null,
                                            nombre:nombre.nombre,
                                            tipoCuenta:null,
                                            saldo:null,
                                            password:null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}

function buscarClientePorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreUsuario))//*********************
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorNombre) => {
                    const clienteEncontrado = respuestaBDD.bdd.usuarios
                        .find(
                            (cliente)=>{
                                return cliente.nombre === respuesta.nombre;
                            }
                        )
                    respuestaBDD.usuario = clienteEncontrado;
                    return rxjs.of(respuestaBDD);
                }
            )
        );
}

function eliminarPorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarPorNombre))//***************************
        .pipe(
            mergeMap(
                (respuesta: EliminarUsuarioPorNombre)=>{
                    const indiceDelNombre = respuestaBDD.bdd.usuarios.findIndex((cliente)=>{
                        return cliente.nombre === respuesta.nombre;
                    });
                    console.log(indiceDelNombre)
                    const resultadoSplice = respuestaBDD.bdd.usuarios.splice(indiceDelNombre,1);
                    return rxjs.of(respuestaBDD);
                }
            )
        )

}

/************************** Interfaces ******************************/
interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    idUsuario: number;
}

interface BDD {
    usuarios: Usuario[] | any;

}

interface Usuario {
    id: number;
    nombre: string;
    password: string;
    tipoCuenta: string;
    saldo: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: number;
}

interface BuscarUsuarioPorNombre {
    nombre: string;
}

interface EliminarUsuarioPorNombre {
    nombre: string;
}

