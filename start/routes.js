'use strict'

const Route = use('Route')

Route.resource('alerts', 'AlertController')
  .apiOnly()
  .validator(
    new Map([[['alerts.store'], ['Alert']], [['alerts.update'], ['Alert']]])
  )

Route.resource('users', 'UserController')
  .apiOnly()
  .validator(new Map([[['users.store'], ['User']]]))

Route.post('hooks', 'HookController.store')

Route.resource('issues', 'IssueController').apiOnly()
