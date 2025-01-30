/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('payment_detail_id').nullable();
    table.foreign('payment_detail_id').references('payment_details.id').onDelete('SET NULL');
    table.uuid('order_detail_id');
    table.foreign('order_detail_id').references('order_details.id').onDelete('CASCADE');
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
  return knex.schema.dropTable('order_items');
};
