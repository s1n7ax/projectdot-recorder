import Tabs from '../chrome/Tabs';
import Windows from '../chrome/Windows';
import rconf from '../config/recorder-config.json';

export default class IDE {
    private static tabId: number;
    private static windowId: number;

    static async open() {
        if (await IDE.exists()) {
            await IDE.focus();
            return;
        }

        const window = await Windows.create(
            rconf['popup-window']['create-data']
        );

        IDE.windowId = window.id;

        if (window.tabs === undefined || window.tabs.length !== 1)
            throw new Error('Tab was not created with the popup window');

        if (window.tabs[0].id === undefined)
            throw new Error('Tab was not created with the popup window');

        IDE.tabId = window.tabs[0].id;
    }

    private static async exists(): Promise<boolean> {
        try {
            await Tabs.get(IDE.tabId);
            return true;
        } catch (error) {
            return false;
        }
    }

    private static async focus() {
        await Windows.update(
            IDE.windowId,
            rconf['popup-window']['focus-update-info']
        );
    }
}
