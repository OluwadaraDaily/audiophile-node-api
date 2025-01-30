require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"]);

// Wrap Knex's `insert` method
const originalInsert = knex.queryBuilder().insert;
knex.insert = function (data, returning, options) {
  if (Array.isArray(data)) {
    // Handle batch insert
    data = data.map((item) => {
      if (!item.id) {
        item.id = uuidv4();
      }
      return item;
    });
  } else {
    // Handle single insert
    if (!data.id) {
      data.id = uuidv4();
    }
  }

  // Call the original `insert` method
  return originalInsert.call(this, data, returning, options);
};

module.exports = knex;