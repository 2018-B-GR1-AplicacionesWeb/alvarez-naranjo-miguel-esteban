//noticia.controller.ts
import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaService} from "./noticia.service";
import {__await} from "tslib";
import {NoticiaEntity} from "./noticia-entity";
import {FindManyOptions, Like} from "typeorm";

@Controller('noticia')
export class NoticiaController{

    constructor(private readonly _noticiaService: NoticiaService) {

    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda:string,
        @Query('accion') accion:string,
        @Query('titulo') titulo: string,
        @Body() text
    ) {
        let mensaje = undefined;
        if(accion && titulo){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`;
                case 'buscar':
                    mensaje = `Registro ${titulo} creado`;
            }

        }
        console.log(text);

        // const noticias = await this._noticiaService.buscar();

        let noticias: NoticiaEntity[];
        if (busqueda){
            const consulta: FindManyOptions<NoticiaEntity> = {
                where: [
                    {
                        titulo: Like(`%${busqueda}%`)
        },
            {
                descripcion: Like(`%${busqueda}%`)
            }
        ]};
            noticias = await await this._noticiaService.buscar(consulta);
        } else {
            noticias = await this._noticiaService.buscar()
        }

        response.render(
            'inicio',
            {
                usuario:'Miguel',
                arreglo: noticias,
                booleano: false,
                mensaje: mensaje
            }
        );
    }

    @Get('inicio')
    inicioPOST(
        @Res() response,
        @Body() text
    ) {

        console.log(text)

    }

    @Post('eliminar/:idNoticia')
    async eliminar(
        @Res() response,
        @Param('idNoticia') ideNoticia:string,
    ){
        const noticia = await this._noticiaService.buscarPorId(+ideNoticia);
        await this._noticiaService.eliminar(Number(ideNoticia));
        const parametroConsulta = `?accion=borrar&titulo=${noticia.titulo}`;
        response.redirect('/noticia/inicio'+parametroConsulta);
    }

    @Get('crear-noticia')
    crearNoticia(
        @Res() response,
    ){
        response.render(
            'crear-noticia'
        )
    }

    @Post('crear-noticia')
    async crearNoticiaFuncion(
        @Res() response,
        @Body() noticia:Noticia
    ){
        // const noticiaCreada = this._noticiaService.crear(noticia);
        // const parametroConsulta = ?accion=crear&titulo=${noticiaCreada.titulo};
        await this._noticiaService.crear(noticia);
        response.redirect('/noticia/inicio');
        // response.redirect(
        //     '/inicio'
        // )
    }

    @Get('actualizar-noticia/:idNoticia')
    async actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia') idNoticia: string
    ){
        //El "+" le transforma en numero a un string
        //Numerico
        // const noticiaEncontrada = this._noticiaService.buscarPorId(+idNoticia)
        const noticiaEncontrada = await this._noticiaService
            .buscarPorId(+idNoticia);
        response.render(
            'crear-noticia',
            {
                noticia: noticiaEncontrada
            }
        )
    }

    @Post('actualizar-noticia/:idNoticia')
    async actualizarNoticiaMetodo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body () noticia: Noticia
    ) {
        noticia.id = +idNoticia
        // const noticiaActualizada = this._noticiaService.actulizar(+idNoticia, noticia);
        // const parametroConsulta = ?accion=actualizar&titulo=${noticiaActualizada.titulo};
        await this._noticiaService.actulizar(noticia);
        response.redirect('/noticia/inicio');
        // response.redirect(
        //     '/inicio'
        // )
    }
}

export interface Noticia {
    id?: number,
    titulo:string;
    descripcion:string;
}