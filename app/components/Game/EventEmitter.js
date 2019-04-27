
const EventEmitter = {
  eventsChangeType: {},
  eventsQueue: [],
  listeners: [],
  nextEventListeners: [],
  returnQueueResult: [],
  push({ type, params }) {
    this.eventsQueue.push({ [type]: params });
    this.listeners.map(listener => listener({ isLastEvent: false }));
    if (this.eventsQueue.length === 1) {
      const eventType = Object.keys(this.eventsQueue[0])[0];
      this.nextEventListeners.map((listener) => {
        if (!this.eventsQueue[0]) return null;
        return listener({ type: eventType, params: this.eventsQueue[0][type] });
      });
    }
  },
  pop() {
    // last event remove
    if (this.eventsQueue.length === 1) {
      const result = this.returnQueueResult
        .map(resultFunc => resultFunc())
        .reduce((acc, nextValue) => ({ ...acc, ...nextValue }), {});
      this.listeners.forEach(listener => listener({ isLastEvent: true, result, params: {} }));
    }
    this.eventsQueue = [...this.eventsQueue.slice(1)];
    if (this.eventsQueue.length !== 0) {
      const eventType = Object.keys(this.eventsQueue[0])[0];
      this.nextEventListeners.map(
        listener => listener({ type: eventType, params: this.eventsQueue[0][eventType] })
      );
    }
  },
  subscibeToEventsFinish(listener) {
    this.returnQueueResult.push(listener);

    return () => {
      this.returnQueueResult = this.returnQueueResult.filter(l => l !== listener);
    };
  },
  subscibe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  subscibeToNextEvent(listener) {
    this.nextEventListeners.push(listener);

    return () => {
      this.nextEventListeners = this.nextEventListeners.filter(l => l !== listener);
    };
  },
};

export default EventEmitter;
