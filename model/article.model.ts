import { Model, ModelObject } from "objection";

export class ArticleModel extends Model {
    id!: number;
    title!: string;
    content!: string;
    aprove!: boolean;



    static get tableName() {
        return "articles";
    }



}

export type Articles = ModelObject<ArticleModel>;