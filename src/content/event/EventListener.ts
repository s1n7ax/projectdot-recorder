import IDestroyable from '../../common/IDestroyable';
import IInitializable from '../../common/IInitializable';
import StaticImplements from '../../typescript/StaticImplements';
import IEventDataModel from './IEventDataModel';
import IEventDataSubscriber from './IEventDataSubscriber';
import IEventHandler from './IEventHandler';
import IEventModifier from './IEventModifier';

/**
 * EventListener is the central point that events are captured and broadcast
 * Events captured by EventListener will be passed throw along with EventDataModel object
 *  - BeforeEventHandlers
 *  - SpecificEventHandler
 *  - AfterEventHandlers
 *
 * After EventDataModel is constructed, object will be sent to EventDataSubscriber to handle the reset
 *
 * +-------+    +---------------+
 * | Event |--->| EventListener |------+
 * +-------+    +---------------+      |
 *                           +--------------------+
 *                           | BeforeEventHandler |
 *                           +--------------------+
 *                                     |
 *                                     |
 *                                     | EventDataModel
 *                                     |
 *                                     |
 *                             +--------------+
 *                             | EventHandler |
 *                             +--------------+
 *                                     |
 *                                     |
 *                                     | EventDataModel
 *                                     |
 *                                     |
 *                           +-------------------+
 *                           | AfterEventHandler |
 *                           +-------------------+
 *                                     |
 *                                     |
 *                                     | EventDataModel
 *                                     |
 *                                     |
 *                           +--------------------+
 *                           | EventDataSubscriber|
 *                           +--------------------+
 *
 */
@StaticImplements<IInitializable>()
@StaticImplements<IDestroyable>()
export default class EventListener {
    private static afterHandlerModifiers = new Set<IEventModifier>();
    private static beforeHandlerModifiers = new Set<IEventModifier>();
    private static eventDataSubscribers = new Set<IEventDataSubscriber>();
    private static handlers = new Map<string, IEventHandler>();

    static addAfterHandlerModifier(modifier: IEventModifier) {
        EventListener.afterHandlerModifiers.add(modifier);
    }

    static addBeforeHandlerModifier(modifier: IEventModifier) {
        EventListener.beforeHandlerModifiers.add(modifier);
    }

    static addEventDataSubscriber(subscriber: IEventDataSubscriber) {
        EventListener.eventDataSubscribers.add(subscriber);
    }

    static addHandler(event: string, handler: IEventHandler) {
        EventListener.handlers.set(event, handler);
    }

    static destroy() {
        const keys = EventListener.handlers.keys();

        for (const eventName of keys)
            document.removeEventListener(
                eventName,
                EventListener.commonEventCallback
            );
    }

    static initialize() {
        // initialize event listeners
        const keys = EventListener.handlers.keys();

        for (const eventName of keys)
            document.addEventListener(
                eventName,
                EventListener.commonEventCallback,
                true
            );
    }

    static removeAfterHandlerModifier(modifier: IEventModifier) {
        EventListener.afterHandlerModifiers.delete(modifier);
    }

    static removeBeforeHandlerModifier(modifier: IEventModifier) {
        EventListener.beforeHandlerModifiers.delete(modifier);
    }

    static removeEventDataSubscriber(subscriber: IEventDataSubscriber) {
        EventListener.eventDataSubscribers.delete(subscriber);
    }

    static removeHandler(event: string) {
        EventListener.handlers.delete(event);
    }

    private static commonEventCallback(event: Event): void {
        let eventData: IEventDataModel = {};

        // before handler modifiers
        EventListener.beforeHandlerModifiers.forEach(modifier => {
            eventData = modifier.modify(event, eventData);
        });

        // handlers
        const handler = EventListener.handlers.get(event.type);
        if (handler !== undefined) handler.handle(event, eventData);

        // after handler modifiers
        EventListener.afterHandlerModifiers.forEach(modifier => {
            eventData = modifier.modify(event, eventData);
        });

        // notify subscribers
        EventListener.eventDataSubscribers.forEach(subscriber => {
            subscriber.subscribe(eventData);
        });
    }
}
