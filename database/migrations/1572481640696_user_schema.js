'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('name').notNullable()
      table
        .string('number')
        .notNullable()
        .unique()

      table.string('cep').notNullable()
      table.string('region')
      table.string('full_address')

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
