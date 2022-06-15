import Sprite from "../../Engine/GameObjects/Sprite";
import Vector2D from "../../Engine/Math/Vector2D";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Background extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.BACKGROUND)!;
    this.image = image;
    this.setPosition(0, 0);
  }
}

export default Background;
