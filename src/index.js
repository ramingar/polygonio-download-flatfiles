import moment from 'moment'
import {ConsoleLog, getCommandToExecute, getDatesFromTo, Map, Pipe} from './utils/utils.js'
import config from './config/config.js'

const today       = moment();
const tenYearsAgo = moment().subtract(10, 'year');
const command     = config.command;
const path        = config.path;

Pipe(
    getDatesFromTo,
    Map(getCommandToExecute({moment, command, path})),
    Map(ConsoleLog)
)({moment, from: tenYearsAgo, to: today})
