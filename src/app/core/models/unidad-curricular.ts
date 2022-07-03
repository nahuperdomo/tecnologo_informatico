import { Materia } from "./materia";
import { Previatura } from "./previatura";

export class UnidadCurricular {
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    documento: string;
    semestre: number;
    materia: Materia;
    previas: Previatura [] = [];
    
    constructor(id: number, nombre: string, descripcion: string, creditos: number,documento:string, semestre: number, materia: Materia, previas?: Previatura []) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creditos = creditos;
        this.documento = documento;
        this.materia = materia;
        this.semestre = semestre;
        if (previas) {
        this.previas = previas;
        }
        else {
            this.previas = [];
        }	
    }
}
