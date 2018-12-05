var fs = require('fs');
var rxjs = require('rxjs');
var distinct = require('rxjs/operators').distinct;
var map = require('rxjs/operators').map;
var inquirer = require('inquirer');
// console.log(rxjs);
// console.log(inquirer);
function leerArchivo() {
    fs.readFile('people.json', 'utf-8', function (error, arregloString) {
        if (error) {
            console.error(error);
            console.log('error');
        }
        else {
            var arreglo = JSON.parse(arregloString);
            // console.log(arreglo);
            console.log('HOla');
            console.log(calcularNumeroPeliculasPorPersonaje(arreglo));
        }
    });
}
leerArchivo();
/*
const arreglo: Character[]
    = [
    {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
            "https://swapi.co/api/films/2/",
            "https://swapi.co/api/films/6/",
            "https://swapi.co/api/films/3/",
            "https://swapi.co/api/films/1/",
            "https://swapi.co/api/films/7/"
        ],
        "species": [
            "https://swapi.co/api/species/1/"
        ],
        "vehicles": [],
        "starships": [
            "https://swapi.co/api/starships/12/",
            "https://swapi.co/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.co/api/people/1/"
    },
    {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
            "https://swapi.co/api/films/2/",
            "https://swapi.co/api/films/6/",
            "https://swapi.co/api/films/3/",
            "https://swapi.co/api/films/1/",
            "https://swapi.co/api/films/7/"
        ],
        "species": [
            "https://swapi.co/api/species/1/"
        ],
        "vehicles": [
            "https://swapi.co/api/vehicles/14/",
            "https://swapi.co/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.co/api/starships/12/",
            "https://swapi.co/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.co/api/people/1/"
    }
]
*/
function buscarTipos(propiedad, arreglo) {
    var arregloRepetido = arreglo.map(function (caracter) {
        return caracter[propiedad];
    });
    return rxjs.of(arregloRepetido)
        .pipe(distinct());
}
/*
buscarTipos('gender', arreglo);
buscarTipos('eye_color', arreglo);
buscarTipos('skin_color', arreglo);
buscarTipos('hair_color', arreglo);
buscarTipos('gender', arreglo)
    .pipe(
        map(
            (arregloRepetidos) => {
                return clasificar('gender', arregloRepetidos, arreglo);
            }
        )
    )
*/
function clasificar(propiedad, arregloPropiedades, arreglo) {
    var respuesta = [];
    arregloPropiedades
        .forEach(function (prop) {
        var arregloFiltrado = arreglo
            .filter(function (caracter) {
            return caracter[propiedad] === prop; // EXPRESION
        });
        respuesta.push(arregloFiltrado);
    });
    return respuesta;
}
var arregloAbecedario = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];
function buscarPorAbecedario(arregloAbecedario, arreglo) {
    return arregloAbecedario
        .map(function (letra) {
        var objeto = {};
        objeto[letra] = arreglo.some(function (caracter) {
            return caracter.name.slice(0, 1).toUpperCase() === letra.toUpperCase();
        });
        return objeto;
    });
}
function massHeight(arreglo) {
    return arreglo
        .reduce(function (valorAcumulado, caracter) {
        var masa = Number(caracter.mass);
        var height = Number(caracter.height);
        return valorAcumulado + masa + height;
    }, 0);
}
function buscarSiAUsado(buscarPor, arreglo) {
    return arreglo
        .every(function (caracter) {
        return caracter[buscarPor].length > 1;
    });
}
function calcularNumeroPeliculasPorPersonaje(arreglo) {
    return arreglo
        .map(function (caracter) {
        return {
            nombre: caracter.name,
            numeroPeliculas: caracter.films.length
        };
    });
}
