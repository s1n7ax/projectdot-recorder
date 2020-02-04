type MessageSender = chrome.runtime.MessageSender;
import IDestroyable from '../../common/IDestroyable';
import IInitializable from '../../common/IInitializable';
import StaticImplements from '../../typescript/StaticImplements';
import Runtime from '../Runtime';
import Tabs from '../Tabs';

@StaticImplements<IInitializable>()
@StaticImplements<IDestroyable>()
export default class OTMessage {
    constructor(private tabId: number) {}

    static async commonMessageCallback(
        request: any,
        sender: MessageSender,
        sendRequest: Function
    ): Promise<void> {
        console.log(request);
        console.log(sender);
    }

    static destroy() {
        chrome.runtime.onMessage.removeListener(
            OTMessage.commonMessageCallback
        );
    }

    static initialize() {
        chrome.runtime.onMessage.addListener(OTMessage.commonMessageCallback);
    }

    static async send(message: any) {
        return Runtime.sendMessage(message);
    }

    static async sendTab(tabId: number, message: any): Promise<any> {
        return Tabs.sendMessage(tabId, message);
    }
}
