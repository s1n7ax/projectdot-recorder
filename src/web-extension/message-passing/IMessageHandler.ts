import IMessage from './IMessage';
type Port = chrome.runtime.Port;

export default interface IMessageHandler {
    handle(port: Port, message: IMessage): void;
}
