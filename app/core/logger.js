const fs= require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs'); //basically dirname is the place u writing this code at, and it joins to the other one aka ../../logs and ../ means going up a folder from this logger.js
if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir, {recursive: true});
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // gets the date - converts to string - replaced the :. in the entire date string to - since :. is illegal in naming a file
const logFile = path.join(logsDir, `session-${timestamp}.log`); // this rn is just a path in format of a string

const logLines = []; // empty array

function log(type, line) {
    const entry = `[${type}] ${line}`; // type is suposed to be stdout/stderror

    logLines.push({ type, line, time : new Date().toISOString()}); // loglines array is made so that in case in future if a person comes late this array is there to provide

    console.log(entry); // for user in terminal

    fs.appendFileSync(logFile, entry + '\n'); // this when first runs checks if logfile exists if not it creates it adds entry to it and then new line
}

function getLogs(){
    return logLines;
}

module.exports = {log, getLogs};

