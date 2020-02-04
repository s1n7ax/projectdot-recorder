import IEventDataModel from './IEventDataModel';

/**
 * EventModifier responsible for handling common for events data
 * EventModifier should be added to EventListener.beforeHandlerModifiers or EventListener.afterHandlerModifiers list as below
 * 		EventListener.addBeforeHandlerModifier(EventModifier);
 * 		EventListener.addAfterHandlerModifier(EventModifier);
 * Check EventListener doc for more information on how and when EventModifier is called
 */
export default interface IEventModifier {
    /**
     * Callback method when the event is fired
     * Responsible for returning common data between events to EventData object
     *
     * @param { Event } method will receive an event object
     * @returns { void }
     */
    modify(event: Event, data: IEventDataModel): IEventDataModel;
}
