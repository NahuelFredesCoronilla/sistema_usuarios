import { Maquinaria } from "./Maquinaria";
import { User } from "./user";

export interface Alquiler{
    id:number;
    user:User;
    maquinaria:Maquinaria;
    fechaInicio:Date;
    duracion:number;
    valorAlquilerPorDia:number;
    valorAlquilerTotal:number;
    activo:boolean;

}