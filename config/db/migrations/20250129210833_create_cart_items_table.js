/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cart_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('cart_id');
    table.foreign('cart_id').references('carts.id').onDelete('CASCADE');
    table.uuid('product_id');
    table.foreign('product_id').references('products.id').onDelete('CASCADE');
    table.bigint('amount');
    table.integer('quantity');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cart_items')
};
