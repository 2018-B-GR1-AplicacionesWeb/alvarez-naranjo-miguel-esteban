declare var require: any;
const inquirer = require('inquirer');

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
    {type: 'input', name: 'nombre', message: 'Ingrese nombre de Usuario a Buscar: '}
];

const preguntaEdicionUsuario = [
    {type: 'input', name: 'nombre', message: 'Cual es el nuevo nombre? '},
];