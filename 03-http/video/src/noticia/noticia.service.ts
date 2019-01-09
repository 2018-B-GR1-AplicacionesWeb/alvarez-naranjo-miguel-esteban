import {Inject, Injectable} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaEntity} from "./noticia-entity";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class NoticiaService{
    arreglo:Noticia[] = [
        {
            id:1,
            titulo:'A',
            descripcion:'Descripcion A'
        },
        {
            id:2,
            titulo:'B',
            descripcion:'Descripcion B'
        },
        {
            id:3,
            titulo:'C',
            descripcion:'Descripcion C'
        },
        {
            id:4,
            titulo:'D',
            descripcion:'Descripcion D'
        }
    ]
    numeroRegistro = 5;

    constructor(
        @InjectRepository(NoticiaEntity)
        private readonly _noticiaRepository:Repository<NoticiaEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<NoticiaEntity>)
        :Promise<NoticiaEntity[]>{
        return this._noticiaRepository.find(parametrosBusqueda);
    }

    crear(noticia:Noticia):Promise<NoticiaEntity>{
        // noticia.id = this.numeroRegistro;
        // this.numeroRegistro++;
        // this.arreglo.push(noticia);
        // return noticia;

        // el Create es como un cosntructor de la entidad
        const noticiaEntity: NoticiaEntity = this._noticiaRepository.create(noticia);
        //El metodo save guarda en la DDB
        return this._noticiaRepository.save(noticiaEntity);

    }

    eliminar(idNoticia: number): Promise<NoticiaEntity>{
        // const indiceNoticia = this.arreglo
        //     .findIndex(
        //         (noticia)=>{
        //             return noticia.id == idNoticia;
        //         }
        //     )
        // const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]));
        // this.arreglo.splice(indiceNoticia,1);
        // return registroEliminado;
        const noticiaEliminar: NoticiaEntity = this._noticiaRepository.create({
            id: idNoticia
        });

        return this._noticiaRepository.remove(noticiaEliminar);
    }

    actulizar(nuevaNoticia: Noticia): Promise<NoticiaEntity>{
        // const indiceNoticia = this.arreglo
        //     .findIndex(
        //         (noticia)=>{
        //             return noticia.id == idNoticia;
        //         }
        //     )
        // // this.arreglo[indiceNoticia].titulo =
        // this.arreglo[indiceNoticia] = nuevaNoticia;
        // return this.arreglo[indiceNoticia];

        const noticiaEntity: NoticiaEntity = this._noticiaRepository.create(nuevaNoticia);
        //El metodo save guarda en la DDB
        return this._noticiaRepository.save(noticiaEntity);

    }

    buscarPorId(idNoticia: number):Promise<NoticiaEntity>{
        // const indiceNoticia = this.arreglo
        //     .findIndex(
        //         (noticia)=>{
        //             return noticia.id === idNoticia;
        //         }
        //     )
        // return this.arreglo[indiceNoticia];

        return this._noticiaRepository.findOne(idNoticia);
    }

}