class GameAnimation {
  private imageList: HTMLImageElement[];
  private countFrame: number;
  private animationFrame: number;
  private index: number;
  public deltaDegree: number; // degree per amount of time
  private rotateFrame: number;
  private countRotate: number;

  constructor() {
    this.imageList = [];
    this.countFrame = 0;
    this.animationFrame = 0;
    this.index = 0;
    this.deltaDegree = 0;
    this.rotateFrame = 0;
    this.countRotate = 0;
  }

  public addImage(image: HTMLImageElement): void {
    this.imageList.push(image);
  }

  public getImage(index: number): HTMLImageElement {
    return this.imageList[index];
  }

  public setAnimationFrame(frame: number): void {
    this.animationFrame = frame;
  }

  public updateMotion(): HTMLImageElement {
    if (this.animationFrame > 0) {
      this.countFrame++;
      if (this.countFrame >= this.animationFrame) {
        this.countFrame = 0;
        this.index++;
        if (this.index >= this.imageList.length) this.index = 0;
        return this.imageList[this.index];
      }
    }
    return this.imageList[this.index];
  }

  public setRotateFrame(frame: number): void {
    this.rotateFrame = frame;
  }

  public setDeltaDegree(degree: number) {
    this.deltaDegree = degree;
  }

  public getDeltaDegree(): number {
    return this.deltaDegree;
  }

  public updateRotateAngle(): number {
    if (this.rotateFrame > 0) {
      this.countRotate++;
      if (this.countRotate >= this.rotateFrame) {
        this.countRotate = 0;
        return this.deltaDegree;
      }
    }
    return 0;
  }
}

export default GameAnimation;
