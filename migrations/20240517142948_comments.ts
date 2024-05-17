import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("comments", function (table) {
        table.increments("id").primary();
        table.integer("articleId").unsigned().notNullable().references("id").inTable("articles").onDelete("CASCADE");
        table.string("content").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
}

