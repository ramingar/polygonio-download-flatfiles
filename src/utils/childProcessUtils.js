import util from 'util'
import {exec} from 'child_process'

const execCommand = command => {
    const execAsync = util.promisify(exec);

    return execAsync(command)
        .then(({stdout, stderr}) => {
            console.error(`Errors: ${stderr}`);
            return stdout;
        })
        .catch(error => {
            console.error(`Error while trying to execute the command: ${error}`);
            throw error;
        });
}

export {execCommand}