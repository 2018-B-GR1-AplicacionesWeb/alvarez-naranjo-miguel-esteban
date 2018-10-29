// 06-callback-propio.js

const fs = require('fs');

let totalArchivo = 'INICIO';

function appendFile(nombreArchivo, contenidoArchivo, callback) {

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(err);
                        } else {
                            console.log('Archivo creado');
                            callback(undefined, contenidoArchivo);
                        }
                    }
                );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(err);
                        } else {
                            console.log('Archivo creado');
                            callback(undefined, contenidoArchivoLeido + contenidoArchivo);
                        }
                    }
                );
            }
        }
    );
}

appendFile('06-texto.txt',
    '\n Adios mundo',
    (contenidoArchivo, error) => {
        if (error) {
            console.log('Error', error);
        } else {
            // contenidoArchivo
        }

    }
);

const promesaAppendFile = new Promise(
    (resolve, reject)=>{
        fs.readFile(nombreArchivo, 'utf-8',
            (error, contenidoArchivoLeido) => {
                if (error) {
                    fs.writeFile(nombreArchivo, contenidoArchivo,
                        (err) => {
                            if (err) {

                                reject(err)
                            } else {

                                resolve(contenidoArchivo)
                            }
                        }
                    );
                } else {
                    fs.writeFile(
                        nombreArchivo,
                        contenidoArchivoLeido + contenidoArchivo,
                        (err) => {
                            if (err) {
                                console.error('Error escribiendo');
                                totalArchivo = 'ERROR';
                            } else {
                                console.log('Archivo creado');
                                resolve(contenidoArchivoLeido + contenidoArchivo);
                            }
                        }
                    );
                }
            }
        );
    }
)

promesaAppendFile
    .catch((err) => {//las promesas tienen dos formas de resolverse, la primera
        console.error('Error escribiendo');

    })
    .then((contenidoArchivo) => {//las promesas tienen dos formas de resolverse, la primera
        console.log('Archivo creado');

    })

// ['A','B','C']

// 0-A.txt 'A'
// 1-B.txt 'B'
// 2-C.txt 'C'


// [respuesta,respuesta,respuesta,respuesta,respuesta]

function ejercicioDeArchivos(arregloStrings, callback) {

    const arregloRespuestas = [];

    arregloStrings
        .forEach(
            (string, indice) => {
                const archivo = `${indice}-${string}.txt`;
                const contenido = string;
                fs.writeFile(archivo,
                    contenido,
                    (err) => {
                        const respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const tamanoRespuestas = arregloRespuestas.length;
                        if (tamanoRespuestas === arregloStrings.length) {
                            callback(arregloRespuestas)
                        }
                    });
            }
        );
    /*
        for (let i = 0; i < arregloStrings.length; i++) {


            ;

            fs.writeFile(`${i}-${arregloStrings[i]}.txt`,
                contenido,
                (err) => {
                    const respuesta = {
                        nombreArchivo: archivo,
                        contenidoArchivo: contenido,
                        error: err
                    };
                    arregloRespuestas.push(respuesta);
                    const tamanoRespuestas = arregloRespuestas.length;
                    if (tamanoRespuestas === arregloStrings.length) {
                        callback(arregloRespuestas)
                    }
                });
        }

        */
}

const arregloStrings = ['A', 'B', 'C'];

ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas) => {
        console.log(arregloRespuestas);
    });







