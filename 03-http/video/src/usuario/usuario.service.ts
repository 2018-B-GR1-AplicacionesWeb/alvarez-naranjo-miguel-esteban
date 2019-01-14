// usuario.service.ts

import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:Repository<UsuarioEntity>
    ){

    }

    async autenticar(username: string,
                     password: string): Promise<boolean>{
        //si la password esta encryptada
        //hay que encriptar el password que nos llega
        const consulta: FindOneOptions<UsuarioEntity> = { //tipando el objeto sabemos exactamente que mandar
            where:{
                username: username,
                password: password // se manda el password encriptado
            }
        }
        const respuesta = await this._usuarioRepository.findOne(consulta)

        if(respuesta){
            return true;
        } else {
            return false;
        }
    }

}