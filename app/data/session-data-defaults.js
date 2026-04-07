/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.
============================================================================
Example usage:
"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================
*/

let dpsServices       = require('./dps-services.json')
let dpsAlerts         = require('./dps-alerts.json')
let dpsMalePrisoners  = require('./dps-male-prisoners.json')


module.exports = {

  // Global variables
  'userName': 'J. Bloggs',
  'prisonName': 'Preston (HMP)',

  // Prison today (home page)
  'unlockRoll': '320',
  'currentPop': '789',
  'arrivedToday': '12',
  'outToday': '16',

// Insert values here
  dpsServices,
  dpsAlerts,
  dpsMalePrisoners
}
