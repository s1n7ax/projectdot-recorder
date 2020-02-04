import StaticImplements from '../../../typescript/StaticImplements';
import IEventDataModel from '../IEventDataModel';
import IEventHandler from '../IEventHandler';

@StaticImplements<IEventHandler>()
export default class ClickEventHandler {
    static handle(event: Event, data: IEventDataModel): IEventDataModel {
        console.log(event);
        return data;
    }
}
