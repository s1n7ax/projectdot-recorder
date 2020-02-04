type CreateProperties = chrome.tabs.CreateProperties;
type Tab = chrome.tabs.Tab;

/**
 * chrome.tabs API wrapper
 */
export default class Tabs {
    /**
     * Create new tab
     * @param { CreateProperties } createProperties - tab properties to create with
     * @returns { Promise<Tab> } - details of the created tab
     */
    static async create(createProperties: CreateProperties): Promise<Tab> {
        return new Promise((resolve, reject) => {
            chrome.tabs.create(
                createProperties,
                PromiseResolveCallback(resolve, reject)
            );
        });
    }

    static async get(tabId: number): Promise<Tab> {
        return new Promise((resolve, reject) => {
            chrome.tabs.get(tabId, PromiseResolveCallback(resolve, reject));
        });
    }

    static async sendMessage(
        tabId: number,
        message: any,
        frameId?: number
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const localFrameId = frameId !== undefined ? frameId : {};

            chrome.tabs.sendMessage(
                tabId,
                message,
                localFrameId,
                PromiseResolveCallback(resolve, reject)
            );
        });
    }
}
