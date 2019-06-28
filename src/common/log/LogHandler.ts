import ILogHandler, { TimestampFormatter } from './ILogHandler';
import LogLevel from './LogLevel';

/** Default log handler class
 * - Configurable to filter out unwanted log messages by log level
 * - Configurable to add the timestamp and use a custom timestamp formatter
 *
 * - DEFAULT timestamp is false
 * - DEFAULT timestampFormatter is defaultTimestampFormatter()
 */
export default class LogHandler implements ILogHandler {
    private readonly filters: Set<LogLevel> = new Set<LogLevel>();
    private timestamp: boolean;
    private timestampFormatter: TimestampFormatter;

    constructor() {
        this.timestamp = false;
        this.timestampFormatter = this.defaultTimestampFormatter;
    }

    /** LogHandler subscriber function
     * - handle() method receives all the logs and it's levels from the application to be handled
     *
     * @param { LogLevel } level - log level of the message
     * @param { Object[] } message - one or more messages
     * @returns { void }
     */
    handle(level: LogLevel, ...message: readonly Object[]): void {
        // if log level not in the filter list it will be ignored
        if (!this.isLogEnabled(level)) return;

        // add middleware output
        const middlewareOutput: string[] = [];
        if (this.timestamp)
            middlewareOutput.push(this.timestampFormatter(new Date()));

        // get the standard output stream for the log level
        const sout = this.getSOut(level);

        // print the log
        sout(...middlewareOutput, ...message);
    }

    /** Add passed LogLevel to  filter set
     * - Passed LogLevel type logs will be sent to standard output to be logged
     *
     * @param { LogLevel } level - LogLevel to be added
     * @returns { LogHandler } return the current instance
     */
    withFilter(level: LogLevel): this {
        this.filters.add(level);
        return this;
    }

    /** Enable timestamp for logs
     *
     * @returns { LogHandler } return the current instance
     */
    withTimestamp(): this {
        this.timestamp = true;
        return this;
    }

    /** Add custom timestamp formatter for logs
     *
     * @param { TimestampFormatter } formatter - function to generate the timestamp
     * @returns { LogHandler } return the current instance
     */
    withTimestampFormat(formatter: TimestampFormatter): this {
        this.timestampFormatter = formatter;
        return this;
    }

    /** Application default timestamp formatter
     *
     * @param { Date } date - date object to create the timestamp
     * @returns { string } timestamp
     */
    private defaultTimestampFormatter(date: Date): string {
        let day = date.getDate().toString();
        const month = date.toLocaleString('en-us', { month: 'short' });
        let year = date.getFullYear().toString();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milSec = date.getMilliseconds();

        if (day.length === 1) day = `0${day}`;
        year = year.substring(2);

        return `[${hours}:${minutes}:${seconds}:${milSec} ${day}-${month}-${year}]`.padEnd(
            25
        );
    }

    /** Returns the correct output stream respective to log level passed
     *
     * @param { LogLevel } level - log level to determine the output stream
     * @returns { Function } - standard output method
     */
    private getSOut(level: LogLevel): Function {
        let sout: Function;
        switch (level) {
            case LogLevel.ERROR:
                sout = console.error;
                break;
            case LogLevel.WARN:
                sout = console.warn;
                break;
            case LogLevel.INFO:
                sout = console.info;
                break;
            case LogLevel.DEBUG:
                sout = console.debug;
                break;
            case LogLevel.VERBOSE:
                sout = console.debug;
                break;
            case LogLevel.TRACE:
                sout = console.trace;
                break;

            default:
                sout = console.log;
        }

        return sout;
    }

    /** Check if a log level is in the filter list or not
     *
     * @param { LogLevel } level - LogLevel to check the availability in filters list
     * @returns { boolean } - true if LogLevel is in the filter list
     */
    private isLogEnabled(level: LogLevel): boolean {
        return this.filters.has(level);
    }
}
