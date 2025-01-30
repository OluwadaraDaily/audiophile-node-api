/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment_providers', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name');
    table.string('slug');
    table.string('type');
    table.boolean('is_enabled').defaultTo(true);
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payment_providers')
};
