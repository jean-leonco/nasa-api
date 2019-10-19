'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssueSchema extends Schema {
  up () {
    this.create('issues', table => {
      table.string('issue').notNullable()
      table.string('description').notNullable()
      table.string('location')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('issues')
  }
}

module.exports = IssueSchema
