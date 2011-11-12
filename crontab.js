var crontab = [
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
];

module.exports = crontab;
