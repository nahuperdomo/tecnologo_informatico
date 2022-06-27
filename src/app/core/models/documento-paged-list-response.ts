import { Documento } from "./documento";

export class DocumentoPagedListResponse {
    list: Documento[];
    size: number;

    constructor(list: Documento[], size: number) {
        this.list = list;
        this.size = size;
    }
}
