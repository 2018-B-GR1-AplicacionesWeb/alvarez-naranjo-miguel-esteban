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
    { type: 'input', name: 'nombre', message: 'Ingrese nombre de Usuario a Buscar: ' }
];
var preguntaEdicionUsuario = [
    { type: 'input', name: 'nombre', message: 'Cual es el nuevo nombre? ' },
];
