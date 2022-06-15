class EventHandler {
  private static instance: EventHandler;

  private inputs: string[];

  private keyCodeList: string[] = ["Space", "Enter"];

  private constructor() {
    this.inputs = [];
    document.addEventListener("keydown", (e) => {
      if (
        this.keyCodeList.indexOf(e.code) != -1 &&
        this.inputs.indexOf(e.code) == -1
      ) {
        // console.log(`${e.code} down`);
        this.inputs.push(e.code);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (this.keyCodeList.indexOf(e.code) != -1) {
        // console.log(`${e.code} up`);
        this.inputs.splice(this.inputs.indexOf(e.code), 1);
      }
    });
  }

  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  public popInput(keyCode: string): void {
    if (this.inputs.length > 0) {
      this.inputs.splice(this.inputs.indexOf(keyCode), 1);
    }
  }

  public isKeyDown(keyCode: string): boolean {
    if (this.inputs.indexOf(keyCode) != -1) return true;
    return false;
  }
}

export default EventHandler;
