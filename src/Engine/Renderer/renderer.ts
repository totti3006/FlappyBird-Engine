import GameObject from "../Base/GameObject";
import RenderObject from "../Base/RenderObject";
import Label from "../GameObjects/Label";
import Sprite from "../GameObjects/Sprite";

class Renderer {
  private ctx: CanvasRenderingContext2D;

  private static instance: Renderer;

  private constructor() {
    let canvas: HTMLCanvasElement = document.getElementById(
      "maingame"
    ) as HTMLCanvasElement;

    this.ctx = canvas.getContext("2d")!;
  }

  public static getInstance(): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }

    return Renderer.instance;
  }

  public setContext(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
  }

  public drawAll(objectList: Array<RenderObject>): void {
    objectList.forEach((object) => {
      this.drawEach(object);
    });
  }

  private drawEach(object: RenderObject): void {
    if (!object) return;

    let ctx = this.ctx;
    ctx.save();
    // this.ctx.translate(object)

    if (object instanceof Sprite) {
      let sprite = object as Sprite;

      ctx.translate(
        object.getPosition().x + sprite.getWidth() / 2,
        object.getPosition().y + sprite.getHeight() / 2
      );
      ctx.rotate((object.getAngle() * Math.PI) / 180);
      ctx.drawImage(
        sprite.getImage(),
        -sprite.getWidth() / 2,
        -sprite.getHeight() / 2
      );
    } else if (object instanceof Label) {
      let label = object as Label;

      ctx.font = label.getFont();
      ctx.fillStyle = label.getColor();

      let textWidth: number = ctx.measureText(label.getText()).width;
      let textHeight: number = ctx.measureText("M").width;

      ctx.translate(
        object.getPosition().x + textWidth / 2,
        object.getPosition().y + textHeight / 2
      );
      ctx.rotate((object.getAngle() * Math.PI) / 180);
      ctx.fillText(label.getText(), -textWidth / 2, -textHeight / 2);
    }
    ctx.restore();
  }

  public drawText(text: string, color: string, font: string): void {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, 0, 0);
  }
}

export default Renderer;
