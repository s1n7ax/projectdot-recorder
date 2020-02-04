/**
 * Data model that contains all the event data that is sent to event data subscribers
 * Check EventListener doc for more information on how this model is used
 */
export default interface IEventDataModel {
    event?: string;
    locator?: Map<string, string[]>;
}
