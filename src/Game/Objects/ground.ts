import Sprite from "../../Engine/GameObjects/Sprite";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Ground extends Sprite {
  constructor() {
    super();
    let image = LoadImg.getInstance().getImg(setting.GROUND)!;
    this.image = image;
    this.setPosition(0, 420);

    this.setVelocity(-setting.GAME_SPEED, 0);
  }

  public stop(): void {
    this.setVelocity(0, 0);
  }

  public update(dt: number): void {
    if (this.getPosition().x < -16) {
      this.setPosition(0, 420);
    }
    super.update(dt);
  }
}

export default Ground;
