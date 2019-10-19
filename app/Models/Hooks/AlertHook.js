'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/SendWarning')

const IssueHook = (exports = module.exports = {})

IssueHook.sendWarning = async ({ description, location }) => {
  Kue.dispatch(Job.key, { description, location }, { attempts: 3 })
}
