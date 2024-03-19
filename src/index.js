import moment from 'moment'
import {ConsoleLog, getCommandToExecute, getDatesFromTo, Map, Pipe, runAsASynchronousPromises} from './utils/utils.js'
import config from './config/config.js'
import {execCommand} from './utils/childProcessUtils.js';

const today       = moment();
const tenYearsAgo = moment().subtract(10, 'year');
const command     = config.command;
const path        = config.path;
const synchronous = config.synchronous;

const execCommandType = synchronous
    ? runAsASynchronousPromises(execCommand)
    : Map(execCommand);

const executingCommand = Pipe(
    getDatesFromTo,
    Map(getCommandToExecute({moment, command, path})),
    execCommandType
)({moment, from: tenYearsAgo, to: today})

Promise.allSettled(synchronous ? [executingCommand] : executingCommand)
    .then(val => console.log(val))
    .catch(err => console.log(err))
