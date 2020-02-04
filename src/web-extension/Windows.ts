type CreateData = chrome.windows.CreateData;
type Window = chrome.windows.Window;
type UpdateInfo = chrome.windows.UpdateInfo;

export default class Windows {
    static async create(createData: CreateData): Promise<Window> {
        return new Promise((resolve, reject) => {
            chrome.windows.create(createData, window => {
                if (chrome.runtime.lastError !== undefined)
                    reject(chrome.runtime.lastError);
                else resolve(window);
            });
        });
    }

    static async update(windowId: number, updateInfo: UpdateInfo) {
        return new Promise((resolve, reject) => {
            chrome.windows.update(windowId, updateInfo, window => {
                if (chrome.runtime.lastError !== undefined)
                    reject(chrome.runtime.lastError);
                else resolve(window);
            });
        });
    }
}
