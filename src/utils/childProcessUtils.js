import util from 'util'
import {exec} from 'child_process'

const execCommand = command => {
    const execAsync = util.promisify(exec);
    return execAsync(command)
}

export {execCommand}