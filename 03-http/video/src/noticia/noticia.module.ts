import {Module} from "@nestjs/common";
import {NoticiaController} from "./noticia.controller";
import {NoticiaService} from "./noticia.service";
import {NoticiaEntity} from "./noticia-entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    NoticiaEntity
                ]
            )
        ],
        controllers:[
            NoticiaController,

        ],
        providers:[
            NoticiaService,
        ],
        exports:[
            //Servicios o modulos
            NoticiaService
        ]
    }
)
export class NoticiaModule {

}