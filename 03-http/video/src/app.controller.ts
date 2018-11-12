import {Get, Controller, InternalServerErrorException, HttpCode, Post, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller()  //decoradores
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // http://ip:puerto/url
  raiz(
      @Query() todosQueryParams:any,
      @Query('nombre') nombre: string,
  ): string {
    console.log(todosQueryParams);
    return 'HOLA MUNDO' + nombre;
  }

  @Get('segmentoUno/segmentoDos/:idUsuario')
  parametroRuta(
      @Param('idUsuario') id
  ){
    return id;
  }



  @Get('adiosMundo') // url
  adiosMundo():string{
    return 'ADIOS MUNDO';
  }

  @Post('adiosMundo')
  adiosMundoPOST(): string {
    return 'Adios Mundo POST'
  }

    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync(): Promise<string> {
        const promesaAdios = ():Promise<string>=>{
            return new Promise(
                (resolve, reject)=>{
                    reject('Adios Mundo Cruel');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        }catch (e) {
            throw new InternalServerErrorException({mensaje: 'Error SERVIDOR'})
        }

    }

    @Get('adiosMundoObservable')
    adiosMundoObservable(): Observable<string>{
      const respuesta$ = of('Adios Mundo...');
      return respuesta$;
    }

}

