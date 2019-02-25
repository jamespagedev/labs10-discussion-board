exports.up = function (knex, Promise) {
  return knex.schema.createTable('discussions', function (tbl) {
    // Primary Key 'id'
    tbl.increments();

    //Foreign Key 'users_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    //Foreign Key 'category_id'
    tbl
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .notNullable()
      .onDelete('CASCADE');

    // Other Columns
    tbl.string('title', 128).notNullable();

    tbl.text('body', 512).notNullable();

    // Date in milliseconds
    tbl.bigInteger('created_at').notNullable();

    // Date in milliseconds
    tbl.bigInteger('last_edited_at');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('discussions');
};
