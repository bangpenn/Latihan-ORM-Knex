import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('comments').del();

    // Inserts seed entries
    await knex('comments').insert([
        { id: 1, articleId: 57, content: 'Great article!' },
    ]);
}
