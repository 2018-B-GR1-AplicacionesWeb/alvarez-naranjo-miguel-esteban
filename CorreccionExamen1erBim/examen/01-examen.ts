declare var require;

const fs = require('fs');
const rxjs = require('rxjs');
const distinct = require('rxjs/operators').distinct;
const map = require('rxjs/operators').map;
const inquirer = require('inquirer');

// console.log(rxjs);
// console.log(inquirer);

function leerArchivo() {
    fs.readFile(
        'people.json',
        'utf-8',
        (error, arregloString) => {
            if (error) {
                console.error(error);
                console.log('error')
            } else {
                const arreglo = JSON.parse(arregloString);
                // console.log(arreglo);
                console.log('HOla')
                console.log(calcularNumeroPeliculasPorPersonaje(arreglo));
            }
        }
    )
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


function buscarTipos(propiedad: string, arreglo: Character[]) {
    const arregloRepetido = arreglo.map(
        (caracter) => {
            return caracter[propiedad];
        }
    );

    return rxjs.of(arregloRepetido)
        .pipe(
            distinct()
        )


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

function clasificar(propiedad: string,
                    arregloPropiedades: string[],
                    arreglo: Character[]) {
    const respuesta = [];
    arregloPropiedades
        .forEach(
            (prop) => {
                const arregloFiltrado = arreglo
                    .filter(
                        (caracter) => {
                            return caracter[propiedad] === prop // EXPRESION
                        }
                    );
                respuesta.push(arregloFiltrado);
            }
        )
    return respuesta;

}


const arregloAbecedario = [
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


function buscarPorAbecedario(arregloAbecedario: string[], arreglo) {
    return arregloAbecedario
        .map(
            (letra) => {
                const objeto:any =  {};

                objeto[letra] = arreglo.some(
                    (caracter) => {
                        return caracter.name.slice(0, 1).toUpperCase() === letra.toUpperCase()
                    }
                );
                return objeto;
            }
        );
}


function massHeight(arreglo: Character[]) {
    return arreglo
        .reduce(
            (valorAcumulado: number, caracter: Character) => {
                const masa = Number(caracter.mass);
                const height = Number(caracter.height);
                return valorAcumulado + masa + height;
            },
            0
        )
}


function buscarSiAUsado(buscarPor: string, arreglo: Character[]) {
    return arreglo
        .every(
            (caracter) => {
                return caracter[buscarPor].length > 1;
            }
        )
}

function calcularNumeroPeliculasPorPersonaje(arreglo: Character[]) {
    return arreglo
        .map(
            (caracter) => {
                return {
                    nombre: caracter.name,
                    numeroPeliculas: caracter.films.length
                }
            }
        )
}


interface Character {
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "homeworld": string,
    "films": string[],
    "species": string[],
    "vehicles": string[],
    "starships": string[],
    "created": Date | string | any,
    "edited": Date | string | any,
    "url": string
}