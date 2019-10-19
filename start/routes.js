'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('issues', 'IssueController')
  .apiOnly()
  .validator(
    new Map([[['issues.store'], ['Issue']], [['issues.update'], ['Issue']]])
  )

Route.resource('users', 'UserController')
  .apiOnly()
  .validator(
    new Map([[['users.store'], ['User']], [['users.update'], ['User']]])
  )
