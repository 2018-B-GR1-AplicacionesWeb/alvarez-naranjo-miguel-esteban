import {Entity, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";

import {PaginaEntity} from "../pagina/pagina.entity";

@Entity('articulo')
export class ArticuloEntity {
    @PrimaryGeneratedColumn()
    id;number;

    @Column()
    texto:string;

    @ManyToOne(
        type => PaginaEntity,
        pagina => pagina.articulos
    )
    pagina:PaginaEntity
}