const WorldEventEmitter = {

  listeners: [],
  push() {
  },
  pop() {
  },
  subscibe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
};

export default WorldEventEmitter;
