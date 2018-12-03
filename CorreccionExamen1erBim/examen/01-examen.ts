import {distinct} from "rxjs/operators";

declare var require;
const fs = require('fs');
const rxjs = require('rxjs');
const inquirer = require('inquirer');
const arreglo: Character = {"name": "Luke Skywalker",
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
    "url": "https://swapi.co/api/people/1/"}

/*function buscarTipos(propiedad: string, arreglo:Character[]){
    const arregloRepetdio = arreglo.map(
        (caracter) => {
            return caracter[propiedad]
        }
    );
    rxjs.of(arregloRepetdio)
        .pipe(
            distinct()
        )
        .subscribe(
            (arreglo) =>{
                console.log(arreglo)
            }
        )
    return arreglo.map(
        (caracter) =>{
            return caracter[propiedad]
        }
    )
}
console.log(buscarTipos('gender', arreglo))*/

function clasificar(propiedad:string, arregloPropiedades: string[], arreglo:Character[]){
    const respuesta: Character[] = []
    arregloPropiedades
        .forEach(
            (prop) => {

        arreglo.filter(
            (caracter)=>{
                return caracter[propiedad]=== prop//Expresion
            }
        );
        respuesta.push(respuesta)
    }
}

buscarTipos()

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
    "created": string,
    "edited": string,
    "url": string,
}