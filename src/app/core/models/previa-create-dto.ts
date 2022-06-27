export class PreviaCreateDTO {
    public unidadCurricular: number;
    public previa: number;
    public tipo: string;

    constructor(unidadCurricular: number, previa: number, tipo: string) {
        this.unidadCurricular = unidadCurricular;
        this.previa = previa;
        this.tipo = tipo;
    }
}
