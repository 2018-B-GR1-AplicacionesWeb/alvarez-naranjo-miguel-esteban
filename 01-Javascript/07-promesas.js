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


const respuesta = {
    nombreArchivo :'',
    contenidoArchivo :'',
    error : ''
};

const ejercicioDeArchivos = (arregloString)=>{
    console.log('Inicio');
    return new Promise(
        (resolve) => {
            const arregloRespuestas = [];
            arregloString
                .forEach(
                    (string, indice) => {
                        const archivo = `${indice} - ${string}.txt`;
                        const contenido = string;
                        fs.writeFile(archivo,
                            contenido,
                            (error) => {
                                const respuesta = {
                                    nombreArchivo: archivo,
                                    contenidoArchivo: contenido,
                                    error: error

                                };
                                arregloRespuestas.push(respuesta);
                                const tamañoRespuesta = arregloRespuestas.length;

                                if (tamañoRespuesta === arregloString.length) {
                                    //console.log(arregloRespuestas);
                                    //callback(arregloRespuestas);
                                    resolve(arregloRespuestas);
                                }
                            }
                        );
                    }
                )
        }
    )
}

const arregloStrings =['A','B','C'];

// ejercicioDeArchivos(arregloStrings,
//     (arregloRespuestas) => {
//         console.log(arregloRespuestas);
//     }
// )
ejercicioDeArchivos(arregloStrings)
    .then(
        (arregloRespuestas) => {
            console.log('Todo bien', arregloRespuestas);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );
