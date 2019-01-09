//pagina.entityt.ts
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm";
import {NoticiaEntity} from "../noticia/noticia-entity";
import {type} from "os";
import {ArticuloEntity} from "../articulo/articulo.entity";

@Entity('pagina')
export class PaginaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    numero: number;

    @ManyToOne(
        type => NoticiaEntity, //tipo de tabla
        noticia => noticia.paginas
    )
    noticia: NoticiaEntity;

    @OneToMany(
        type => ArticuloEntity,
        articulo => articulo.pagina
    )
    articulos: ArticuloEntity[]
}