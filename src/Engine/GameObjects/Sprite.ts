import GameObject from "../Base/GameObject";
import RenderObject from "../Base/RenderObject";
import GameAnimation from "../Graphics/Animation";

class Sprite extends GameObject {
  protected image: HTMLImageElement | null = null;
  protected animation: GameAnimation | null = null;

  constructor() {
    super();
    this.animation = new GameAnimation();
  }

  public getImage(): HTMLImageElement {
    return this.image!;
  }

  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  public getWidth(): number {
    // console.log(this.getPosition().y);
    return this.image!.width;
  }

  public getHeight(): number {
    return this.image!.height;
  }

  public updateAnimation(): void {
    this.image = this.animation!.updateMotion();
    this.rotate(this.animation!.updateRotateAngle());
  }

  // public static create(image: HTMLImageElement): Sprite {
  //   let sprite = new Sprite();
  //   sprite.image = image;
  //   return sprite;
  // }
}

export default Sprite;
