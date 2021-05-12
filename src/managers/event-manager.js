export class EventManager {

  static _instance = new EventManager();

  listeners = new Map();
  events = [];

  static instance() {
    return this._instance;
  }

  /**
   * @param {Array} eventTypes
   * @param {*} object
   */
  static subscribeTo(eventTypes, object) {
    this.instance().subscribeTo(eventTypes, object);
  }

  static dispatch(event) {
    this.instance().dispatch(event);
  }

  update() {
    for (const event of this.events) {
      const subscribedListeners = this.listeners.get(event.type);

      if (subscribedListeners) {
        for (const listener of subscribedListeners) {
          listener.listen(event);
        }
      }
    }

    this.events = [];
  }

  subscribeTo(eventTypes, object) {
    for (const eventType of eventTypes) {
      if (!this.listeners.get(eventType)) this.listeners.set(eventType, []);

      this.listeners.set(eventType, [...this.listeners.get(eventType), object]);
    }
  }

  dispatch(event) {
    this.events.push(event);
  }

}

export const dispatchGameEvent = EventManager.dispatch.bind(EventManager.instance());
