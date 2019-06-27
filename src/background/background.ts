import Logger from '../common/log/Logger';
import LogHandler from '../common/log/LogHandler';
import LogLevel from '../common/log/LogLevel';

const main = () => {
    /*
     * Setting up logger
     */
    const defaultHandler = new LogHandler();
    defaultHandler
        .withFilter(LogLevel.ERROR)
        .withFilter(LogLevel.WARN)
        .withFilter(LogLevel.INFO)
        .withFilter(LogLevel.DEBUG)
        .withFilter(LogLevel.VERBOSE)
        .withFilter(LogLevel.TRACE)
        .withTimestamp();

    Logger.addHandler(defaultHandler);
};

main();
