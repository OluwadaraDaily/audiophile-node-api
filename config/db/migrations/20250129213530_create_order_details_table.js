/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.uuid('payment_detail_id').nullable();
    table.foreign('payment_detail_id').references('payment_details.id').onDelete('SET NULL');
    table.bigint('total_amount');
    table.enu('status', ['pending', 'completed', 'declined']).defaultTo('pending');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order_details')
};
