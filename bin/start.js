#!/usr/bin/env node

var forever = require('forever');
var wd = __dirname + '/..';
var config = require('../config.js');

var child = forever.startDaemon(
  '/bin/cron.js',
  {
    silent : false,
    sourceDir : wd,
    cwd : wd,
    logFile : wd + config.logFile,
    outFile : wd + config.outFile,
    errFile : wd + config.errFile
  }
);
child.on('start', function(process) {
  console.log('hi');
  forever.startServer(child);
});
child.on('exit', function(forever) {
  console.log('exit');
});
child.on('error', function(err) {
  console.log('error: '+ JSON.stringify(err));
});
