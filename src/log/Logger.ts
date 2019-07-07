import ILogHandler from './ILogHandler';
import LogLevel from './LogLevel';

/** Logger is the common log method for the application.
 * - Provide APIs to log a message (logging will does nothing if handlers are not set to do the job)
 * - Provide APIs to add { ILogHandler } s
 * - I found this awesome definition from [https://www.npmjs.com/package/js-logger]
 *
 * 	This is all you need to know to use the logger
 * 		Logger.debug("I'm a debug message!");
 * 		Logger.info("OMG! Check this window out!", window);
 * 		Logger.warn("Purple Alert! Purple Alert!");
 * 		Logger.error("HOLY SHI... no carrier.");
 * 		Logger.verbose("Very verbose message that usually is not needed...");
 * 		Logger.trace("...containing stack trace (if console.trace() method supports it)");
 */
export default class Logger {
    /** List of handler objects
     * - When log method is called, that message will be sent to these list of listeners to handle
     * - Use addHandler and removeHandler to add and remove handlers
     * - Default log handler is included for free :)
     */
    private static readonly handlers = new Set<ILogHandler>();

    /** Add ILogHandler object to handle log
     *
     * @param { ILogHandler } handler - handler object to handle logs
     * @returns { void }
     */
    static addHandler(handler: ILogHandler): void {
        Logger.handlers.add(handler);
    }

    static debug(...message: readonly Object[]) {
        Logger.log(LogLevel.DEBUG, ...message);
    }

    static error(...message: readonly Object[]) {
        Logger.log(LogLevel.ERROR, ...message);
    }

    static info(...message: readonly Object[]) {
        Logger.log(LogLevel.INFO, ...message);
    }

    /** Remove ILogHandler object from handling logs
     *
     * @param { ILogHandler } handler - handler object to be removed
     * @returns { void }
     */
    static removeHandler(handler: ILogHandler): void {
        Logger.handlers.delete(handler);
    }

    static trace(...message: readonly Object[]) {
        Logger.log(LogLevel.TRACE, ...message);
    }

    static verbose(...message: readonly Object[]) {
        Logger.log(LogLevel.VERBOSE, ...message);
    }

    static warn(...message: readonly Object[]) {
        Logger.log(LogLevel.WARN, ...message);
    }

    /** Notify handlers list about the logs
     *
     * @param { LogLevel } level - level of the log message
     * @param { Object[] } message - one or more messages
     * @returns { void }
     */
    private static log(level: LogLevel, ...message: readonly Object[]): void {
        Logger.handlers.forEach(handler => {
            handler.handle(level, ...message);
        });
    }
}
