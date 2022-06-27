import { Noticia } from "./noticia";

export class NoticiaPagedListResponse {
    public size: number;
    public list: Noticia[];

    constructor(totalCount: number, list: Noticia[]) {
        this.size = totalCount;
        this.list = list;
    }
}
