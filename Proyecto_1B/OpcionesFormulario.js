"use strict";
exports.__esModule = true;
exports.opciones = [
    {
        type: 'list',
        name: 'opcionesPrincipales',
        message: '¿Qué desea hacer...?',
        choices: ['Crear Cuenta', 'Consultar', 'Actualizar Datos', 'Eliminar Cuenta', 'Salir']
    }
];
exports.crearCuentaFormulario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese su Nombre y Apellido: ',
        validate: function (value) {
            var pass = value.match(/^[a-z A-Z]+$/);
            if (pass) {
                return true;
            }
            return 'Su nombre solo debe tener letras';
        }
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
    }
];
