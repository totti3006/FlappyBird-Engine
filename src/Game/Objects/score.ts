import Sprite from "../../Engine/GameObjects/Sprite";
import Vector2D from "../../Engine/Math/Vector2D";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Score extends Sprite {
  constructor(score: string) {
    super();
    let image = LoadImg.getInstance().getImg(score)!;
    this.image = image;
    this.setPosition(setting.WIDTH / 2, 20);
  }
}

export default Score;
