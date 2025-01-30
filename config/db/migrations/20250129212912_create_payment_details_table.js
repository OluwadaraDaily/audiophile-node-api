/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment_details', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.uuid('payment_method_id');
    table.foreign('payment_method_id').references('payment_methods.id').onDelete('CASCADE');
    table.bigint('amount');
    table.enu('status', ['pending', 'completed', 'declined']).defaultTo('pending');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payment_details')
};
