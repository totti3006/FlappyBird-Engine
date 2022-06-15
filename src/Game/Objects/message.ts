import Label from "../../Engine/GameObjects/Label";
import * as setting from "../settings";

class Message extends Label {
  constructor() {
    super("Press Space to play");
    this.setPosition(80, setting.HEIGHT / 2 + 100);
    this.setFont("15px Arial");
    this.setColor("red");
  }
}

export default Message;
