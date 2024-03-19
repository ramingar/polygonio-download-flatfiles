import moment from 'moment'
import {ConsoleLog, getCommandToExecute, getDatesFromTo, Map, Pipe, runAsASynchronousPromises} from './utils/utils.js'
import config from './config/config.js'
import {execCommand} from './utils/childProcessUtils.js';

const command     = config.command;
const path        = config.path;
const synchronous = config.synchronous;
const today       = moment();
const dateFrom    = moment().subtract(config.dateFrom.amount || 10, config.dateFrom.unit || 'year');

const execCommandType = synchronous
    ? runAsASynchronousPromises(execCommand)
    : Map(execCommand);

const executingCommand = Pipe(
    getDatesFromTo,
    Map(getCommandToExecute({moment, command, path})),
    execCommandType
)({moment, from: dateFrom, to: today})

Promise.allSettled(synchronous ? [executingCommand] : executingCommand)
    .then(ConsoleLog)
    .catch(ConsoleLog)
