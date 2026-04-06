#!/usr/bin/env node 
//looks for node

const { program } = require('commander');
const { startRunner } = require('../core/runner');
const { log } = require('../core/logger');

program
  .name('tunnel')
  .version('1.0.0')
  .description('expose local server and stream logs to teammates');

program
  .command('run')
  .description('start your dev server and capture logs')
  .action(() => {
    log('stdin', `tunnel run started with: ${process.argv.join(' ')}`);
    console.log('starting tunnel...');
    startRunner('npm', ['run', 'dev']);
  });

  program.parse(process.argv); // this takes the list of words you wrote in terminal and looks for commands such as run also i think it starts reading after the node and filename