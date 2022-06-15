import Sprite from "../../Engine/GameObjects/Sprite";
import Vector2D from "../../Engine/Math/Vector2D";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Bird extends Sprite {
  constructor() {
    super();

    this.animation!.addImage(LoadImg.getInstance().getImg(setting.BIRD_MID)!);
    this.animation!.addImage(LoadImg.getInstance().getImg(setting.BIRD_DOWN)!);
    this.animation!.addImage(LoadImg.getInstance().getImg(setting.BIRD_UP)!);

    this.animation!.setAnimationFrame(5);

    this.image = this.animation!.getImage(0);

    this.animation?.setRotateFrame(2);

    this.setPosition(setting.WIDTH / 3, setting.HEIGHT / 2);
  }

  public jump(): void {
    this.setVelocity(0, -350);
    this.setForce(0, 1200);

    this.animation!.setAnimationFrame(5);

    if (this.getAngle() > -20) this.animation?.setDeltaDegree(-30); // rotate up
  }

  public fall(): void {
    if (this.getVelocity().y > 400) {
      this.setVelocity(0, 400);
      this.setForce(0, 0);
      this.animation?.setDeltaDegree(25); // rotate down
      this.animation!.setAnimationFrame(0);
    }

    if (this.getAngle() < -20) {
      this.setAngle(-20);
      this.animation?.setDeltaDegree(0);
    }

    if (this.getAngle() >= 90) {
      this.setAngle(90);
      this.animation?.setDeltaDegree(0);
    }
  }

  public stop(): void {
    this.setVelocity(0, 0);
    this.setForce(0, 0);
    this.animation?.setDeltaDegree(0);
  }

  public hit(): void {
    this.animation!.setAnimationFrame(0);
  }

  public update(dt: number): void {
    this.updateAnimation();
    super.update(dt);
  }
}

export default Bird;
