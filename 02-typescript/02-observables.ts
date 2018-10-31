// 02-observables.ts
//import{Paqueteuno, PaqueteDos} from 'rxjs';
//import * as rxjs from 'rxjs';
declare var require: any;
//declare var module:any
const rxjs = require('rxjs');
const observableUno$ = rxjs.of(1,2,3,4,5);
console.log(observableUno$);
//import {Observable} from "rxjs";

//const observableUno$: Observable<number> = rxjs.of(1);
console.log(observableUno$);
observableUno$
    .subscribe(
         (ok) =>{
            console.log(ok);
},
    (error) =>{
            console.log(error);
}
    );