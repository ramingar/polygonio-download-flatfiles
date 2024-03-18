import moment from 'moment'
import {ConsoleLog, getCommandToExecute, getDatesFromTo, Map, Pipe} from './utils/utils.js'
import config from './config/config.js'
import {execCommand} from './utils/childProcessUtils.js';

const today       = moment();
const tenYearsAgo = moment().subtract(10, 'year');
const command     = config.command;
const path        = config.path;

const executingCommand = Pipe(
    getDatesFromTo,
    Map(getCommandToExecute({moment, command, path})),
    Map(execCommand)
)({moment, from: tenYearsAgo, to: today})

Promise.allSettled(executingCommand)
    .then(ConsoleLog)
    .catch(ConsoleLog)