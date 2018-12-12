import {Injectable} from "@nestjs/common";
import {Noticia} from "./app.controller";

@Injectable()
export class NoticiaService{
    arreglo: Noticia[] = [
        {
            id: 1,
            titulo: 'A',
            descripcion: 'Descripcion de a'
        },
        {
            id: 2,
            titulo: 'B',
            descripcion: 'Descripcion de b '
        },
        {
            id: 3,
            titulo: 'C',
            descripcion: 'Descripcion de c '
        },
        {
            id: 4,
            titulo: 'D',
            descripcion: 'Descripcion de d'
        }
    ];
    numeroRegistro = 5;

    crear(noticia: Noticia){
        noticia.id = this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return this.arreglo;
    }

    eliminar(idNoticia: number){
        const indiceNoticia = this.arreglo
            .findIndex(
                (noticia)=>{
                    return noticia.id === Number(idNoticia)
                }
            )
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]))
        this.arreglo.splice(indiceNoticia, 1)
        return registroEliminado;
    }

    actualizar(idNoticia: number, nuevaNoticia:Noticia){
        const indiceNoticia = this.arreglo
            .findIndex(
                (noticia)=>{
                    return noticia.id === Number(idNoticia)
                }
            )
        this.arreglo[indiceNoticia] = nuevaNoticia;
        return this.arreglo[indiceNoticia]
    }
}






