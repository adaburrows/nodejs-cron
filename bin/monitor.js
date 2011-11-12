#!/usr/bin/env node

/*
 * Logger
 * ----------
 * Receives messages from redis
 * =============================================================================
 */

function logger () {
  var config, context, subscriber, publisher;

  // Load config
  this.config = require('../config.js');

  // Create context
  this.redis = require('redis');
  // Create a redis client
  this.subscriber = this.redis.createClient();

  // Set up listening closure
  var self = this;
  this.subscriber.on('psubscribe', function (pattern, count) {
  });
  this.subscriber.on('punsubscribe', function (pattern, count) {
  });
  this.subscriber.on('pmessage', function (pattern, channel, message) {
    // Send it to the processing function.
    self.process(message);
  });

  this.subscriber.psubscribe(this.config.logger_channel + "*");
}

// Processing function: Override this method to implement your worker
logger.prototype.process = function (message_data) {
  console.log(message_data);
};

var monitor = new logger();
