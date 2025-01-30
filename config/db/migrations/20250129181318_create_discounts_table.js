/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('discounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('code', 25);
    table.text('description', 'longtext');
    table.decimal('discount_percent');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // return knex.schema.dropTable('categories');
};
