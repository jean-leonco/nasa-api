'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlertSchema extends Schema {
  up () {
    this.create('alerts', table => {
      table.string('description').notNullable()
      table.string('location').notNullable()

      table
        .integer('issue_id')
        .unsigned()
        .references('id')
        .inTable('issues')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('alerts')
  }
}

module.exports = AlertSchema
