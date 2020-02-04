export default class Runtime {
    static async sendMessage(message: any): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
                message,
                PromiseResolveCallback(resolve, reject)
            );
        });
    }
}
