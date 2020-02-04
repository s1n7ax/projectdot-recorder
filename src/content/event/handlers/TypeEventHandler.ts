import Logger from '../../../common/log/Logger';
import IEventHandler from '../IEventHandler';

export default class TypeEventHandler implements IEventHandler {
    event = 'change';

    handle(event: Event) {
        Logger.info(event);
    }
}
