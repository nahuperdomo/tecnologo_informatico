export class Materia {
    id:number;
    nombre:string;
    descripcion:string;
    creditosMinimos:number;

    constructor (id:number, nombre:string, descripcion:string, creditosMinimos:number){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creditosMinimos = creditosMinimos;
    }
}
