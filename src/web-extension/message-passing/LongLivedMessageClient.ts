import IMessage from './IMessage';
import IMessageHandler from './IMessageHandler';

export default class LongLivedMessageClient {
    private static messageHandlers = new Map<string, IMessageHandler>();
    private static port = chrome.runtime.connect();

    static initialize() {
        LongLivedMessageClient.port.onMessage.addListener(message => {
            const handler = LongLivedMessageClient.messageHandlers.get(
                (message as IMessage).type
            );

            if (handler === undefined) return;

            handler.handle(LongLivedMessageClient.port, message as IMessage);
        });
    }

    static send(message: IMessage) {
        LongLivedMessageClient.port.postMessage(message);
    }

    static withHandler(type: string, handler: IMessageHandler) {
        LongLivedMessageClient.messageHandlers.set(type, handler);
    }
}
