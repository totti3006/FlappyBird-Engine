import Sprite from "../../Engine/GameObjects/Sprite";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Title extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.TITLE)!;
    this.image = image;
    this.setPosition(55, setting.HEIGHT / 4);
  }
}

export default Title;
