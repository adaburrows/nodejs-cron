var config = {};

config.logger_channel = 'loggercron'; // Redis channel for logging
config.gap = 5; // Interval in seconds
config.max_drift = 100; // Maximum amount of drift allowed before the interval timer is reset.

module.exports = config;
