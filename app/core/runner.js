const { spawn } = require('child_process');
const readline = require('readline');
const { log } = require('./logger');

function startRunner(command, args) {

    //spawn basically starts a new program seperately without pausing the original one and can share data with the parent process
    const child = spawn(command, args, {

        shell: true, //shell is a command line interpreter used for executing commands and having it true runs the command exactly if we used command prompt to execute it
        cwd: process.cwd(), // cwd is current working directory which is equal to the process's cwd which is basically tells the current path 
    });

    const stdoutReader = readline.createInterface({ input: child.stdout }); //readline reads the stdout till a new line where it takes the input as child's stdout
    stdoutReader.on('line', (line) => { //line is a pre-set event that readline emits basically a listener to the even readline
        log('stdout', line);
    });

    const stderrReader = readline.createInterface({ input: child.stderr });
    stderrReader.on('line', (line) => {
    log('stderr', line);
    });

    const stdinReader = readline.createInterface({ input: process.stdin });
    stdinReader.on('line', (line) => {
    log('stdin', line);
    child.stdin.write(line + '\n'); // forward input to child process like if after running the original process it asks for some input child should also receieve that input right?
    });

    child.on('close', (code) => {
    log('stdout', `process exited with code ${code}`);
    stdoutReader.close();
    stderrReader.close();
    stdinReader.close();
    process.exit(code);
    });

}

module.exports = { startRunner };