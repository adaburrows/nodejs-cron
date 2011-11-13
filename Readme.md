nodejs-cron
===========

This allows for higher than once a minute resolution a la setInterval(). On one of my servers, noticed the timer drifting and firing earlier and earlier. I decided to keep track of the milisecond drift and reset the timer when it exceeds a certain threshold, specified in the config. The core timer logic is nearly finished. Allowing execution of arbitrary commands needs to be added.

This uses redis pub/sub to log and stream logs and error messages. This functionality will be extended to make a more real-time monitoring system. Making redis optional is a probable future feature.

Make sure you have redis running. Run bin/monitor.js to watch the output of the cron jobs (defined in crontab.js). Run bin/cron.js to start a cron process without daemonizing it. Run bin/start.js to daemonize it.
