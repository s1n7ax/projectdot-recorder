import IEventDataModel from './IEventDataModel';

/**
 * Event handler responsible for handling event specific data
 * EventDataSubscriver should be added to EventListener.handlers list as below
 * 		EventListener.addHandler(EventHandler);
 * Check EventListener doc for more information on how and when EventHandler is called
 */
export default interface IEventHandler {
    /**
     * Callback method when the event is fired
     * Responsible for returning event specific data to EventData object
     *
     * @param { Event } method will receive an event object
     * @returns { void }
     */
    handle(event: Event, data: IEventDataModel): IEventDataModel;
}
