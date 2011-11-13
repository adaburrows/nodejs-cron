var config = {
  'logger_channel': 'loggercron',	// Redis channel for logging
  'gap': 5,				// Interval in seconds
  'max_drift': 100,			// Maximum amount of drift allowed before the interval timer is reset.
  'logFile': 'cron.log',
  'outFile': 'cron.log',
  'errFile': 'error.log'
};

module.exports = config;
