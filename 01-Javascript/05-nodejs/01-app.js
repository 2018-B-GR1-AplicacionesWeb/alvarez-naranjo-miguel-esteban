const calculadora = require('./02-calculadora.js'); //se puede poner la extension .js u omitirla
const util = require('../05-nodejs-02/01-util');
const tiempo = require('./tiempo/01-tiempo');
const fs = require('fs');
const expressjs = require('express');


console.log('calculadora', calculadora.nombreCalculadora);
console.log('calculadora', calculadora.sumarDosNumeros(1, 2));
console.log('util', util);
console.log('tiempo', tiempo);
console.log('fs', fs);
console.log('expressjs', expressjs);
