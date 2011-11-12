/*
 * cron_runner constructor
 * -----------------------
 * Kicks off the whole process with the settings sent to it.
 */
function cron_runner (conf) {
  var interval_id, start_time, gap, max_drift, jobs, redis, logger, logger_channel;
  this.redis = require('redis');
  this.logger = this.redis.createClient();
  this.redis.debug_mode = false;
  this.logger_channel = conf.logger_channel;
  this.interval_id = false;
  this.jobs = [];
  this.gap = conf.gap;
  this.max_drift = conf.max_drift;
  this.restart();
}

/*
 * log
 * ---
 * Convenience function for logging
 */
cron_runner.prototype.log = function(message) {
  if(this.logger) {
    this.logger.publish(this.logger_channel, message);
  }
};

/*
 * restart
 * -------
 * Fires start at the end of the calculated interval
 */
cron_runner.prototype.restart = function() {
  // If an interval has been set, clear it
  if(this.interval_id) {
    clearInterval(this.interval_id);
  }
  // Calculate the time in miliseconds until the next gap starts
  this.start_time = this.gap * 1000 - (Date.now() % (this.gap * 1000) );
  this.log(new Date() + " Firing start in " + this.start_time + " milliseconds.");
  // In the calculated time, start the interval timer
  var self = this;
  setTimeout(
    function() {
      self.start();
    },
    this.start_time
  );
};

/*
 * start
 * -----
 * This actually sets up the interval timer
 */
cron_runner.prototype.start = function() {
  this.log(new Date() + " Starting cron job.");
  this.executor();
  var self = this;
  this.interval_id = setInterval(
    function() {
      self.executor();
    },
    this.gap * 1000
  );
};

/*
 * executor
 * --------
 * Checks the amount of drift and restarts the timer if needed
 * Executes all jobs at their specified intervals
 */
cron_runner.prototype.executor = function() {
  var now = Date.now();
  // calculate the absolute drift timer trigger
  var abs_drift = now % (this.gap * 1000);
  var drift = abs_drift;
  // If the absolute drift indicates we're firing early,
  if ( (abs_drift > this.max_drift) && (this.gap * 1000 - abs_drift < this.max_drift) ) {
    // then drift calculate a negative number with respect to when it should have fired.
    drift = abs_drift - this.gap * 1000;
  }
  // If this is too early or late, restart the timer from a more accurate point
  if ( Math.abs(drift) >= this.max_drift) {
    this.restart();
    return;
  }
  this.log(now + " Jobs: " + this.jobs.length + " Drift: " + drift);
  var self = this;
  var log = function(message) { self.log(message); };
  // Iterate over jobs
  for (job in this.jobs) {
  /*
   * TODO: implement an at property and check for it to be able to schedule jobs
   */
    // If we're at the right interval fire a job.
    // Subtract the drift to compensate for it
    if( ( (now - drift) % (this.jobs[job].gap * 1000) ) == 0) {
      // Fire the action passing in the logger object
      this.jobs[job].action(log);
    }
  }
};

/*
 * add
 * ---
 * adds a job object of array of job objects to the list of jobs
 */
cron_runner.prototype.add = function(jobby) {
  if(Array.isArray(jobby)) {
    this.jobs = this.jobs.concat(jobby);
  } else {
    this.jobs.push(jobby);
  }
};

module.exports = cron_runner;
