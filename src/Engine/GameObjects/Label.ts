import GameObject from "../Base/GameObject";

abstract class Label extends GameObject {
  protected text: string;
  protected font: string;
  protected color: string;

  constructor(
    text: string,
    font: string = "30px Arial",
    color: string = "black"
  ) {
    super();
    this.text = text;
    this.font = font;
    this.color = color;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getFont(): string {
    return this.font;
  }

  public setFont(font: string): void {
    this.font = font;
  }
}

export default Label;
