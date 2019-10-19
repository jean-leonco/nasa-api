'use strict'

const Model = use('Model')

class Alert extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'AlertHook.sendWarning')
  }

  issue () {
    return this.belongsTo('App/Models/Issue')
  }
}

module.exports = Alert
