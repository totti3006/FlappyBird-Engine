import Command from "../../Game/Commands/Command";

class InputHandler {
  private static instance: InputHandler;

  private eventQueue: Array<any>;

  private commands: Array<{ command: Command; keyCode: string }>;

  private constructor() {
    this.eventQueue = new Array<any>();
    this.commands = new Array<any>();

    document.addEventListener("keydown", this.listen);
  }

  public static getInstance(): InputHandler {
    if (!InputHandler.instance) {
      InputHandler.instance = new InputHandler();
    }
    return InputHandler.instance;
  }

  public listen = (event: any): void => {
    this.eventQueue.push(event);
  };

  public static addEventListener(command: Command, keyCode: string): void {
    this.instance.commands.push({ command: command, keyCode: keyCode });
  }

  public static removeEventListener(command: Command, keyCode: string): void {
    const index = this.instance.commands.findIndex((ele) => {
      return ele.command == command && ele.keyCode == keyCode;
    });
    if (index > -1) {
      this.instance.commands.splice(index, 1);
    }
  }

  public processInput(): void {
    while (this.eventQueue.length) {
      let event = this.eventQueue.splice(0, 1)[0];
      this.commands.forEach((command) => {
        if (command.keyCode == event.code) {
          command.command.execute();
        }
      });
    }
  }
}

export default InputHandler;
