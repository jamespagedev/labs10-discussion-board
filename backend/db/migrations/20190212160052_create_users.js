exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // Other Columns
    tbl
      .string('username', 16)
      .notNullable()
      .unique();
    tbl.string('password', 128).notNullable();
    tbl.string('email', 128).unique();
    tbl.string('status', 16).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
