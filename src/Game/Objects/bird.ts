import Sprite from "../../Engine/GameObjects/Sprite";
import LoadImg from "../LoadImg";
import * as setting from "../settings";

class Bird extends Sprite {
  private freeFalling: boolean = false;
  private pauseVelocity: number = 0;
  private pauseDeltaAngle: number = 0;

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

  public jump = (): void => {
    this.setVelocity(0, -350);
    this.setForce(0, 1200);
    this.setFreeFalling(false);

    this.animation!.setAnimationFrame(5);

    this.animation?.setDeltaDegree(-30); // rotate up
  };

  private isFreeFalling(): boolean {
    return this.freeFalling;
  }

  private setFreeFalling(v: boolean): void {
    this.freeFalling = v;
  }

  private setFall(): void {
    this.setVelocity(0, 400);
    this.setForce(0, 0);
    this.animation?.setDeltaDegree(25); // rotate down
    this.animation!.setAnimationFrame(0);
  }

  public handleFall(): void {
    if (this.isFreeFalling()) {
      this.adjustRotateDown();
    } else {
      if (this.getVelocity().y > 400) {
        this.setFreeFalling(true);
        this.setFall();
      }
      this.adjustRotateUp();
    }
  }

  private adjustRotateUp(): void {
    if (this.getAngle() < -20) {
      this.setAngle(-20);
      this.animation?.setDeltaDegree(0);
    }
  }

  private adjustRotateDown(): void {
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

  public pause = (): void => {
    this.pauseVelocity = this.getVelocity().y;
    this.setVelocity(0, 0);
    this.setForce(0, 0);
    this.animation!.setAnimationFrame(0);
    this.pauseDeltaAngle = this.animation!.getDeltaDegree();
    this.animation?.setDeltaDegree(0);
  };
  public resume = (): void => {
    this.setVelocity(0, this.pauseVelocity);
    this.setForce(0, 1200);
    this.animation!.setAnimationFrame(5);
    this.animation?.setDeltaDegree(this.pauseDeltaAngle);
  };
}

export default Bird;
