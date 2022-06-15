import Label from "../../Engine/GameObjects/Label";
import * as setting from "../settings";

class HighScore extends Label {
  constructor() {
    super("High score: ");
    this.setPosition(52, setting.HEIGHT / 2);
    this.setVisibility(false);
  }
}

export default HighScore;
