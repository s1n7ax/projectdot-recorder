import IEventDataModel from './IEventDataModel';

/**
 * Event data subscribers will receive an IEventDataModel object when an action is fired
 * EventDataSubscriver should be added to EventListener.eventDataSubscribers list as below
 * 		EventListener.addEventDataSubscriber(EventDataSubscriber);
 * Check EventListener doc for more information on how and when EventDataSubscriber is called
 *
 */
export default interface IEventDataSubscriber {
    /**
     * Callback method when the event is fired
     *
     * @param { IEventDataModel } data - receives constructed event data by handler and modifiers
     * @returns { void }
     */
    subscribe(data: IEventDataModel): void;
}
