const PromiseResolveCallback = (resolve: Function, reject: Function) => {
    return (...response: any[]) => {
        if (chrome.runtime.lastError !== undefined)
            reject(chrome.runtime.lastError);
        else resolve(...response);
    };
};
