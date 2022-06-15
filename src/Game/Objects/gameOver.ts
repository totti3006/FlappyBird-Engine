import Sprite from "../../Engine/GameObjects/Sprite";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class GameOver extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.GAMEOVER)!;
    this.image = image;
    this.setPosition(48, setting.HEIGHT / 4);
    this.setVisibility(false);
  }
}

export default GameOver;
