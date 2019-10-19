'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssuesSchema extends Schema {
  up () {
    this.create('issues', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('issues')
  }
}

module.exports = IssuesSchema
