export class Documento {
    id: number;
    titulo: string;
    tipo:string;
    documentoPDF:string;
    activo:boolean;
    constructor(id: number, titulo: string, tipo:string, documentoPDF:string, activo:boolean) {
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.documentoPDF = documentoPDF;
        this.activo = activo;
    }
}
