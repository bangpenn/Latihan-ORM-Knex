import { Model, ModelObject } from "objection";
import { CommentsModel } from './comment.model'

export class ArticleModel extends Model {
    id!: number;
    title!: string;
    content!: string;
    aprove!: boolean;



    static get tableName() {
        return "articles";
    }

    static get relationMappings() {
        return {
            comments: {
                relation: Model.HasManyRelation,
                modelClass: CommentsModel,
                join: {
                    from: 'articles.id',
                    to: 'comments.articleId',
                }
            }
        }
    }



}

export type Articles = ModelObject<ArticleModel>;