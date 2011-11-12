#!/usr/bin/env node

var config = require('../config.js');
var cron_runner = require('../lib/cron_runner.js');
var cron_tab = require('../crontab.js');

var cron = new cron_runner(config);
cron.add(cron_tab);
