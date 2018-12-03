import { Injectable } from '@nestjs/common';
import {Usuario} from "./app.controller";

@Injectable()
export class AppService {
    bdd: Usuario[] = []; //Archivo JASON
    /// DEBER en lugar de guardar aqui guardar en archivos ---->

    crearUsuario(usuario:Usuario){
        this.bdd.push(usuario);
        return this.bdd;
    }

    // convertirnos en un cliente
    //axios
    //mysql

}