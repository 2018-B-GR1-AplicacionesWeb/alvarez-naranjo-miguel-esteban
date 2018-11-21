import {
    Headers,
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Head, UnauthorizedException, Req, Res
} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";
import {Request} from "express";

@Controller()  //decoradores
// Controller('usuario')
// http://localhost:3000/usuario
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get() // http://ip:puerto
    // @Get('crear')
    // http://localhost:3000/usuario/crear?nombre=Adrian
    @HttpCode(204) // status
    raiz(
        @Query() todosQueryParams: any,  //{nombre:"Adrian"}
        @Query('nombre') nombre: string, // adrian
    ): string {
        console.log(todosQueryParams);
        return 'Hola Mundo' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')  // PARAMETRO RUTA
    // http://localhost:3000/usuario/segmentoUno/segmentoDos/10
    parametroRuta(
        @Param('idUsuario') id
    ) {
        return id;
    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios Mundo';
    }

    @Post('adiosMundo') // url
    adiosMundoPOST(): string {
        return 'Adios Mundo POST';
    }

    @Get('adiosMundoPromesa') // url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
        }

    }

    @Get('adiosMundoObservable') // url
    adiosMundoObservable(): Observable<string> {
        const respuesta$ = of('Adios Mundo');
        return respuesta$;
    }

    @Post('crearUsuario')
    @HttpCode(200)  // Codigo OK
    crearUsuario(
        @Body() usuario: Usuario,
        @Body('nombre') nombre: string,
        @Headers() cabeceras, // Cabeceras de peticion,
        @Headers('seguridad') codigo, // Cabeceras de peticion
        @Res() res,
        @Req() req: Request,
    ) {
        // crear usuario
        console.log('Cookies', req.cookies);
        console.log(usuario);
        console.log(cabeceras);

        if (codigo === '1234') {
            res.append('token', '5678'); // AQUI
            res.send('ok');
        } else {
            throw new UnauthorizedException({  // MALO
                mensaje: 'Error de autorizacion',
                error: 401
            })
        }


    }


}


interface Usuario {
    nombre: string;
}

// http://localhost:3000