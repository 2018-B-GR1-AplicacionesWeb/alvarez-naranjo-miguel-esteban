import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateNoticiaDto {

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion: string;
}