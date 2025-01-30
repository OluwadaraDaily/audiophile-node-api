/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.uuid('payment_method_id')
    table.foreign('payment_method_id').references('payment_details.id').onDelete('CASCADE');
    table.uuid('order_detail_id');
    table.foreign('order_detail_id').references('order_details.id').onDelete('CASCADE');
    table.bigint('amount');
    table.string('currency_code');
    table.enu('status', ['pending', 'completed', 'declined']).defaultTo('pending');
    table.string('transaction_reference');
    table.integer('retries').defaultTo(0);
    table.text('notes', 'longtext');
    table.json('meta_data');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payment_transactions')
};
