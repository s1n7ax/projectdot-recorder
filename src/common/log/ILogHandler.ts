import LogLevel from './LogLevel';

export default interface ILogHandler {
    handle(level: LogLevel, ...message: readonly Object[]): void;
}

export type TimestampFormatter = (date: Date) => string;
