const fs = require('fs');
const contenidoAAgregar = 'Miguel Esteban Alvarez!\n';
const nombreDelArchivo = '05-texto.txt';


console.log('Inicio');
fs.readFile('04-Operadores.js',
    'utf-8',
    (error, contenidoArchivo) => { //CallBack
        if(error){
            console.error(error);
            try{
                throw new Error(error); //hace terminar abruptamente, en try catch continua
            } catch (e){
                console.log(e);
            }

            console.log('extra')
        } else{
            console.log('Si sirvio  ', contenidoArchivo)

        }
    });
console.log('FIN')