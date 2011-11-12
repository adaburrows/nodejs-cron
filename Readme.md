nodejs-cron
===========

This allows for higher than once a minute resolution a la setInterval(). On one of my servers, noticed the timer drifting and firing earlier and earlier. I decided to keep track of the milisecond drift and reset the timer when it exceeds a certain threshold, specified in the config. The core timer logic is nearly finished, but the rest in bound to change. The core will be factored out into a standalone daemon using forever in the next revision, the cron jobs will then be contained in a separate config file (no manual set-up and creation of the cron object and addition of jobs).

This uses redis pub/sub to log and stream logs and error messages. This functionality will be extended to make a more real-time monitoring system.

Create a cron_runner object, passing in the config object. Call the add method passing in a job object or array of job objects. See cron_demo.js for details. I will be adding the capability to spawn off child processes without having to write your own object and closure for spawning and streaming stdout and stderr to the log.

Make sure you have redis running. Run monitor.js to see the logging messages. Run cron_demo.js to start the demo cron jobs.
