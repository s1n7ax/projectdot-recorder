import IMessage from './IMessage';
import IMessageHandler from './IMessageHandler';

export default class LongLivedMessageHost {
    private static messageHandlers = new Map<string, IMessageHandler>();

    static initialize() {
        chrome.runtime.onConnect.addListener(port => {
            console.log('tab connected!!!!!!!!!!!!!!!!!!!!!');
            port.onMessage.addListener(message => {
                const messageHandler = LongLivedMessageHost.messageHandlers.get(
                    (message as IMessage).type
                );

                if (messageHandler === undefined) return;

                messageHandler.handle(port, message as IMessage);
            });
        });
    }

    static withMessageHandler(type: string, handler: IMessageHandler) {
        LongLivedMessageHost.messageHandlers.set(type, handler);
    }
}
