// 07-promesas.js

const fs = require('fs');

const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('06-texto23.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';

            fs.writeFile('06-texto23.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

nuevaPromesaLectura
    .then(
        (contenidoArchivo) => {
            console.log('Todo bien', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido completo', contenidoCompleto);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
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