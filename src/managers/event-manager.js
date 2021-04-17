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
  subscribeTo(eventTypes, object) {
    for (const eventType of eventTypes) {
      if (!this.listeners.get(eventType)) this.listeners.set(eventType, []);

      this.listeners.set(eventType, [...this.listeners.get(eventType), object]);
    }
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

  dispatch(event) {
    this.events.push(event);
  }

}
