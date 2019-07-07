import Logger from '../log/Logger';
import LogHandler from '../log/LogHandler';
import LogLevel from '../log/LogLevel';

const main = () => {
    /*
     * Setting up logger
     */
    const defaultHandler = new LogHandler();
    defaultHandler
        .withLogLevel(LogLevel.ERROR)
        .withLogLevel(LogLevel.WARN)
        .withLogLevel(LogLevel.INFO)
        .withLogLevel(LogLevel.DEBUG)
        .withLogLevel(LogLevel.VERBOSE)
        .withLogLevel(LogLevel.TRACE)
        .withTimestamp();

    Logger.addHandler(defaultHandler);
};

main();
