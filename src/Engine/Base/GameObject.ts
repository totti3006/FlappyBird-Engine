import Vector2D from "../Math/Vector2D";

abstract class GameObject {
  protected position: Vector2D = new Vector2D(0, 0);
  protected angle: number = 0;
  protected velocity: Vector2D = new Vector2D(0, 0);
  protected force: Vector2D = new Vector2D(0, 0);

  private visibility: boolean = true;

  public rotate(dAngle: number): void {
    this.angle += dAngle;
  }

  public update(dt: number): void {
    this.position.x = this.position.x + this.velocity.x * (dt * 0.001);
    this.position.y = this.position.y + this.velocity.y * (dt * 0.001);
    this.velocity.x = this.velocity.x + this.force.x * (dt * 0.001);
    this.velocity.y = this.velocity.y + this.force.y * (dt * 0.001);
  }

  public getPosition(): Vector2D {
    return this.position;
  }

  public setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  public setAngle(angle: number): void {
    this.angle = angle;
  }

  public getAngle(): number {
    return this.angle;
  }

  public getVelocity(): Vector2D {
    return this.velocity;
  }

  public setVelocity(x: number, y: number): void {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  public addVelocity(x: number, y: number): void {
    this.velocity.add(new Vector2D(x, y));
  }

  public getForce(): Vector2D {
    return this.force;
  }

  public setForce(x: number, y: number): void {
    this.force.x = x;
    this.force.y = y;
  }

  public addForce(x: number, y: number): void {
    this.force.add(new Vector2D(x, y));
  }

  public isVisible(): boolean {
    return this.visibility;
  }

  public setVisibility(v: boolean) {
    this.visibility = v;
  }
}

export default GameObject;
