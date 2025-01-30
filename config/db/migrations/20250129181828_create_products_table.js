/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name');
    table.text('description', 'longtext');
    table.string('alt_name');
    table.string('tag');
    table.bigint('unit_price');
    table.integer('quantity');
    table.uuid('discount_id').nullable();
    table.foreign('discount_id').references('discounts.id').onDelete('SET NULL');
    table.uuid('category_id').nullable();
    table.foreign('category_id').references('categories.id').onDelete('SET NULL');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('products')
};
