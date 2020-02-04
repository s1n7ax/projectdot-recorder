import Logger from '../../log/Logger';
import IMessage from '../IMessage';
type Port = chrome.runtime.Port;

export default class ClickMessageHandler {
    handle(port: Port, message: IMessage) {
        Logger.info(port);
        Logger.info(message);
    }
}
