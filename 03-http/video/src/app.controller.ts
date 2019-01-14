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
    Head, UnauthorizedException, Req, Res, Session
} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";
import {Request, Response} from "express";
import {NoticiaService} from "./noticia/noticia.service";
import {UsuarioService} from "./usuario/usuario.service";

@Controller()  //decoradores
// Controller('usuario')
// http://localhost:3000/usuario
export class AppController {


    // public servicio:AppService;
    constructor(private readonly _appService: AppService,
                private readonly _noticiaService: NoticiaService,
                private readonly _usuarioService: UsuarioService) {  // NO ES UN CONSTRUCTOR
        // this.servicio = servicio;
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
        return 'Adios mundo'
    }

    @Post('adiosMundo') // url
    adiosMundoPOST(
        @Res() response,
    ) {
        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: [],
                booleano: true,
            }
        );
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
        @Res() res: Response,
        @Req() req: Request | any,
    ) {
        // crear usuario
        console.log('Cookies', req.cookies);  // LEIDO
        console.log('Cookies', req.secret);
        console.log('Cookies Seguras', req.signedCookies);  // LEIDO
        console.log(usuario);
        console.log(cabeceras);

        if (codigo === '1234') {

            const bdd = this._appService.crearUsuario(usuario);

            res.append('token', '5678'); // AQUI
            res.cookie("app", "web"); // INSEGURA
            res.cookie("segura", "secreto", {
                signed: true
            });

            res.json(bdd);

        } else {
            throw new UnauthorizedException({  // MALO
                mensaje: 'Error de autorizacion',
                error: 401
            })
        }


    }

    //app.controller.ts
    @Get('login')
    mostrarLogin(
        @Res() res
    ) {
        res.render('login')
    }

    @Post('login')
    @HttpCode(200)
    async ejecutarLogin(
        @Body('username') username:string,
        @Body('password') password:string,
        @Res() res,
        @Session() sesion
    ){
        const respuesta = await this._usuarioService.autenticar(username,password);
        console.log(sesion)
        if (respuesta){
            sesion.usuario = username;
            res.send('ok');
        } else {
            res.redirect('login');
        }
    }

    @Get('logout')
    logout(
        @Res() res,
        @Session() sesion
    ) {
        sesion.username = undefined;
        sesion.destroy();
        res.redirect('login');
    }

}


export interface Usuario {
    nombre: string;
}

export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}


// http://localhost:3000