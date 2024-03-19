const Pipe = (...funcs) => {
    return arg => {
        return funcs.reduce((acc, func) => func(acc), arg);
    };
}

const mapCurried = fnTransform => array => {
    return array.reduce((acc, val) => {
        return [...acc, fnTransform(val)];
    }, []);
}

const mapStandard = (fnTransform, array) => {
    return array.reduce((acc, val) => {
        return [...acc, fnTransform(val)];
    }, []);
}

/**
 * This function is polymorphed.
 * The Map function is a higher-order function that takes either one or two arguments. If it receives one argument, it returns a curried version of the map function. If it receives two arguments, it directly applies the map function to the given array.
 *
 * @example
 *      const double = x => x * 2;
 *      const numbers = [1, 2, 3, 4, 5];
 *      const curriedMap = Map(double);
 *      const curriedResult = curriedMap(numbers);
 *      // curriedResult: [2, 4, 6, 8, 10]
 *
 *      const standardResult = Map(double, numbers);
 *      // standardResult: [2, 4, 6, 8, 10]
 *
 * Outputs
 * (function): The curried version of the map function if one argument is provided.
 * (array): The result of directly applying the map function to the given array if two arguments are provided.
 *
 * @param {args: any} args The argument(s) to be passed to the map function.
 * @returns {(function(*): *)|Array} (function): The curried version of the map function if one argument is provided. (array): The result of directly applying the map function to the given array if two arguments are provided.
 */
const Map = (...args) => args.length === 1 ? mapCurried(args[0]) : mapStandard(...args)

const ConsoleLog = text => console.log(text)

const runAsASynchronousPromises = fn => promises => {
    return promises.reduce((acc, val) => acc.finally(() => fn(val)), Promise.resolve())
}

const getDatesFromTo = ({moment, from, to}) => {
    return from.diff(to) >= 0
        ? [from.format('YYYY-MM-DD')]
        : [from.format('YYYY-MM-DD'), ...getDatesFromTo({moment, from: from.add(1, 'day'), to})]
}

const getCommandToExecute = ({moment, command, path}) => date => {
    return command
        .replace(/<YYYY>/gi, moment(date).format('YYYY'))
        .replace(/<MM>/gi, moment(date).format('MM'))
        .replace(/<DD>/gi, moment(date).format('DD'))
        .replace(/<PATH>/gi, path)
}

export {Pipe, Map, ConsoleLog, runAsASynchronousPromises, getDatesFromTo, getCommandToExecute}