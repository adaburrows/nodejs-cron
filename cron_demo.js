var config = require('./config.js');
var cron_runner = require('./cron.js');

var cron = new cron_runner(config);
cron.add([
  {
    'gap': 20,
    'action': function(log) {
      log("Job One!");
    }
  },
  {
    'gap':10,
    'action': function(log) {
      log("Job Two!");
    }
  }
]);
