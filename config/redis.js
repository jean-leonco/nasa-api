'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

const Url = require('url-parse')
const REDIS_URL = new Url(Env.get('REDIS_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  local: {
    host: REDIS_URL.hostname,
    port: REDIS_URL.port,
    password: REDIS_URL.password,
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [
      {
        host: REDIS_URL.hostname,
        port: REDIS_URL.port,
        password: REDIS_URL.password,
        db: 0
      },
      {
        host: REDIS_URL.hostname,
        port: REDIS_URL.port,
        password: REDIS_URL.password,
        db: 0
      }
    ]
  }
}
