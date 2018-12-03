var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inquirer = require('inquirer');
var fs = require('fs');
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
        message: 'Cual es tu nombre'
    },
];
var preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];
var preguntaUsuarioNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuesta, _a, respuestaUsuario, respuestaUsuarioBusquedaPorNombre, existeUsuario, respuestaNuevoNombre, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Empezo');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 14, , 15]);
                    return [4 /*yield*/, inicializarBase()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, inquirer.prompt(preguntaMenu)];
                case 3:
                    respuesta = _b.sent();
                    _a = respuesta.opcionMenu;
                    switch (_a) {
                        case 'Crear': return [3 /*break*/, 4];
                        case 'Actualizar': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 13];
                case 4: return [4 /*yield*/, inquirer.prompt(preguntaUsuario)];
                case 5:
                    respuestaUsuario = _b.sent();
                    return [4 /*yield*/, anadirUsuario(respuestaUsuario)];
                case 6:
                    _b.sent();
                    main();
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, inquirer.prompt(preguntaUsuarioBusquedaPorNombre)];
                case 8:
                    respuestaUsuarioBusquedaPorNombre = _b.sent();
                    return [4 /*yield*/, buscarUsuarioPorNombre(respuestaUsuarioBusquedaPorNombre.nombre)];
                case 9:
                    existeUsuario = _b.sent();
                    if (!existeUsuario) return [3 /*break*/, 12];
                    return [4 /*yield*/, inquirer.prompt(preguntaUsuarioNuevoNombre)];
                case 10:
                    respuestaNuevoNombre = _b.sent();
                    return [4 /*yield*/, editarUsuario(respuestaUsuarioBusquedaPorNombre.nombre, respuestaNuevoNombre.nombre)];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    console.log('El usuario no existe');
                    main();
                    return [3 /*break*/, 13];
                case 13: return [3 /*break*/, 15];
                case 14:
                    e_1 = _b.sent();
                    console.log('Hubo un error');
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function inicializarBase() {
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                fs.writeFile('bdd.json', '{"usuarios":[],"mascotas":[]}', function (err) {
                    if (err) {
                        reject({ mensaje: 'Error' });
                    }
                    resolve({ mensaje: 'ok' });
                });
            }
            else {
                resolve({ mensaje: 'ok' });
            }
        });
    });
}
function anadirUsuario(usuario) {
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
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
