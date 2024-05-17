import { Knex } from 'knex';

exports.seed = async function(knex: Knex) {

    await knex('articles').del();
  
    return knex('articles').insert([
      { title: 'First Article', content: 'Content of the first article', aprove: true },
      { title: 'Second Article', content: 'Content of the second article', aprove: true },
      { title: 'Third Article', content: 'Content of the third article', aprove: false },
    ]);
  };
  