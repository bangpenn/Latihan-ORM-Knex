import { Model } from 'objection';
import { ArticleModel } from './article.model';

export class CommentsModel extends Model {
    id!: number;
    articleId!: number; 
    content!: string;

    static get tableName() {
        return 'comments';
    }

    static get relationMappings() {
        return {
            article: {
                relation: Model.BelongsToOneRelation,
                modelClass: ArticleModel,
                join: {
                    from: 'comments.articleId',
                    to: 'articles.id',
                },
            },
        };
    }
}
