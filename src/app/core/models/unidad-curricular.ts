import { Materia } from "./materia";
import { Previatura } from "./previatura";

export class UnidadCurricular {
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    materia: Materia;
    previas: Previatura [] = [];
    
    constructor(id: number, nombre: string, descripcion: string, creditos: number, materia: Materia) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creditos = creditos;
        this.materia = materia;
    }
}
