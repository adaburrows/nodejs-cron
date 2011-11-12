var config = {
  'logger_channel': 'loggercron',	// Redis channel for logging
  'gap': 5,				// Interval in seconds
  'max_drift': 100			// Maximum amount of drift allowed before the interval timer is reset.
};

module.exports = config;
