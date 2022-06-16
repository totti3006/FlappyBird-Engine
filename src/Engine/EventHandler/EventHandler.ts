class EventHandler {
  private static instance: EventHandler;

  private eventListeners: Array<{ type: string; callback: any; key?: string }>;

  private eventQueue: Array<any>;

  private constructor() {
    this.eventListeners = new Array<any>();
    this.eventQueue = new Array<any>();

    document.addEventListener("mousedown", this.listen);
    document.addEventListener("keydown", this.listen);
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  public static addEventListener(type: string, callback: any, key?: string) {
    this.instance.eventListeners.push({
      type: type,
      callback: callback,
      key: key,
    });
  }

  public static removeEventListener(type: string, callback: any, key?: string) {
    const index = this.instance.eventListeners.findIndex((ele) => {
      return ele.type == type && ele.callback == callback && ele.key == key;
    });
    if (index > -1) {
      this.instance.eventListeners.splice(index, 1);
    }
  }

  public listen = (event: any): void => {
    this.eventQueue.push(event);
  };

  public handle(): void {
    while (this.eventQueue.length) {
      let event = this.eventQueue.splice(0, 1)[0];
      this.eventListeners.forEach((ele) => {
        if (ele.type == event.type && ele.key == event.code) {
          ele.callback(event);
        }
      });
    }
  }
}

export default EventHandler;
