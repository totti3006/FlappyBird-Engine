import Sprite from "../../Engine/GameObjects/Sprite";
import Vector2D from "../../Engine/Math/Vector2D";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class PipeBottom extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.PIPE_BOTTOM)!;
    this.image = image;

    this.setPosition(setting.WIDTH * 2, setting.HEIGHT);
  }

  public move(): void {
    this.setVelocity(-setting.GAME_SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }
}

export default PipeBottom;
