/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('shipping_infos', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('address');
    table.string('zip_code');
    table.string('city');
    table.string('country');
    table.uuid('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('shipping_infos')
};
