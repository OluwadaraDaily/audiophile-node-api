const db = require("../../config/db/db");

async function clearDatabase() {
  // Disable foreign key checks
  await db.raw('SET FOREIGN_KEY_CHECKS = 0');

  const tables = await db.raw('SHOW TABLES');
  const tableNames = tables[0].map((t) => Object.values(t)[0]);

  // Truncate each table
  for (const table of tableNames) {
    await db.raw(`TRUNCATE TABLE ${table}`);
  }

  // Re-enable foreign key checks
  await db.raw('SET FOREIGN_KEY_CHECKS = 1');
}

afterAll(async () => {
  await clearDatabase(); // Clear the database
  await db.destroy(); // Close the database connection
});