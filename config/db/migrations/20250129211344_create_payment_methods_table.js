/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment_methods', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name_alias');
    table.uuid('payment_provider_id')
    table.foreign('payment_provider_id').references('payment_providers.id').onDelete('CASCADE');
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.enu('type', ['card', 'transfer']);
    table.json('account_details');
    table.string('currency_code');
    table.boolean('is_primary').defaultTo(false);
    table.enu('status', ['active', 'expired', 'disabled']).defaultTo('active');
    table.string('external_id');
    table.json('meta_data');
    table.date('expires_at');
    table.timestamp('last_used_at');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payment_methods')
};
