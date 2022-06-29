import { UnidadCurricular } from "./unidad-curricular";

export class UnidadesSemestrales {
    public semestre: number;
    public unidadesCurriculares: UnidadCurricular[];

    constructor(semestre: number, unidadesCurriculares: UnidadCurricular[]) {
        this.semestre = semestre;
        this.unidadesCurriculares = unidadesCurriculares;
    }
}
