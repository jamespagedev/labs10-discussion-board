const { defaultAvatar } = require('../../config/globals.js');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_settings', function(tbl) {
    /*  Relationship
      - One user_id to one id
    */

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // avatar: base64
    tbl
      .text('avatar')
      .defaultTo(defaultAvatar);

    // Account type: user and gold_member
    tbl.string('user_type', 32).defaultTo('user');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_settings');
};
