import Sprite from "../../Engine/GameObjects/Sprite";
import Vector2D from "../../Engine/Math/Vector2D";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class PipeTop extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.PIPE_TOP)!;
    this.image = image;

    this.setPosition(setting.WIDTH * 2, 0);
  }

  public move(): void {
    this.setVelocity(-setting.GAME_SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }
}

export default PipeTop;
