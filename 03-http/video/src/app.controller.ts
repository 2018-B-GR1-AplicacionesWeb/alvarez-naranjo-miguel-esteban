import {
    Get,
    Controller,
    InternalServerErrorException,
    HttpCode,
    Post,
    Query,
    Param,
    Body,
    Headers,
    UnauthorizedException, Res, Req
} from '@nestjs/common';

import { AppService } from './app.service';
import {Observable, of} from "rxjs";
import {Request, Response} from 'express'
import {NoticiaService} from "./noticia/noticia.service";
import stringMatching = jasmine.stringMatching;

// Un controlador solo sirve para recivir y responder una peticion

@Controller()   //decoradores -- una funcion antes de lo q sea ponga despues

//Controler(usuario)  // usado para las rutas
//http://localhost:3000/usuario
export class AppController { // Export en otros archivos importar a esta clase

    constructor(private readonly _servicio: AppService,
                private readonly _noticiaService: NoticiaService) {
    }

    // @Get()
    // root(): string { // el nombre q se le de al metodo no importa
    //
    // @Get() // lo que acepta como parametro es la URL --> http://ip:puerto/url
    // // @HttpCode(204) // lo que acepta como parametro es la URL --> http://ip:puerto/url
    // raiz(
    //     // nombre:string
    //     @Query()todoslosQueryParams:any,
    //     @Query('nombre')nombre:string,
    // ): string {
    //   // return this.appService.root();
    //     console.log(todoslosQueryParams);
    //     return 'Hola Mundo '+nombre;
    // }
    //
    //   @Get('segmentoUno/segmentoDos/:idUsuario') // url  con parametro de ruta
    //   parametroRuta(@Param('idUsuario')id) { //Paramtro de ruta
    //       // return this.appService.root();
    //       return id
    //   }
    //
    //
    // @Get('adiosMundo') // url
    // adiosMundo(): string {
    //   // return this.appService.root();
    //     return 'Adios Mundo'
    // }
    //
    // @Get('adiosMundoPromesa') // url
    // adiosMundoPromesa(): Promise<string> {
    //     const promessaAdios = (): Promise<string> =>{
    //       return new Promise(
    //           (resolve, reject) =>{
    //              reject('Adios Mundo Promesa');
    //           }
    //       )
    //     };
    //     return promessaAdios();
    // }
    //
    //   @Get('adiosMundoAsync') // url
    //   @HttpCode(201)
    //   async adiosMundoPromesaA(): Promise<string> {
    //       const promessaAdios = (): Promise<string> =>{
    //           return new Promise(
    //               (resolve) =>{
    //                   resolve('Adios Mundo Promesa');
    //               }
    //           )
    //       };
    //       try {
    //           const  respuesta = await promessaAdios();
    //           return respuesta;
    //       }catch (e) {
    //           console.error(e);
    //           throw new InternalServerErrorException({mensaje: 'error del servidor'});
    //       }
    //   }
    //
    //   @Get('adiosMundoObservable')
    //   adiosMundoPObservable(): Observable<string> {
    //       const respuestaa = of('AdiosMundo');
    //       return respuestaa;
    //   }
    //
    //   // @Post('adiosMundoPost')
    //   // adiosMundoPOST(): string {
    //   //     return 'Adios Mundo Post';
    //   // }
    //
    //   @Post('crearUsuario')
    //   @HttpCode(201) //se usa cuando_todo sale bien mientras que el throw es para cuando algo sale mal
    //   crearUsuario(
    //       @Body() usuario: Usuario,
    //       @Body('nombre') nombre: string,
    //       @Headers() cabeceras,
    //       @Headers('seguridad') codigo,
    //       @Res() res: Response,
    //       @Req() req: Request | any,
    //   ){
    //       console.log('Cookies: ',req.cookies); //Solo lectura
    //       console.log('Cookies: ',req.secret); //Solo lectura
    //       console.log('Cookies Seguras: ',req.signedCookies); //Solo lectura
    //       console.log(usuario);
    //       // console.log(cabeceras);
    //       if(codigo==='1234'){
    //           const bdd = this._servicio.crearUsuario(usuario);
    //           res.append('token','5678'); // el codigo se queda aqui
    //           res.cookie('app','web');
    //           res.cookie('segura','secreto',{
    //               // secure: true,
    //               signed: true
    //           });
    //           // res.send('ok');
    //           res.json(bdd);
    //           // return 'ok';
    //       }else{
    //           throw new UnauthorizedException(
    //               {
    //                   mensaje: 'Error de autorizacion',
    //                   error: 401
    //               }
    //           )
    //       }
    //   }



}

export interface Usuario {
    nombre:string;
}
export interface Noticia {
    id?: number,
    titulo:string;
    descripcion:string;
}


// >npm run start:dev

// http://localhost:3000