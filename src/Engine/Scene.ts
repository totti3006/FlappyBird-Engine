import GameObject from "./Base/GameObject";

class Scene {
  private objectList: Array<{ object: GameObject; index: number }>;
  private active: boolean;
  private visibility: boolean;

  constructor() {
    this.objectList = new Array<{ object: GameObject; index: number }>();
    this.active = true;
    this.visibility = true;
  }

  public addObject(object: GameObject, index: number): void {
    this.objectList.push({ object: object, index: index });
  }

  public remove(object: GameObject): void {
    const indice = this.objectList.findIndex((ele) => {
      return ele.object == object;
    });
    if (indice > -1) {
      this.objectList.splice(indice, 1);
    }
  }

  public removeAll(): void {
    this.objectList.splice(0, this.objectList.length);
  }

  public getAllVisibleObject(): Array<GameObject> {
    let visibleObjectList = this.objectList.filter((ele) => {
      return ele.object.isVisible();
    });

    let sortedVisibleObjectList = visibleObjectList.sort((a, b) => {
      return a.index - b.index;
    });

    let result: Array<GameObject> = sortedVisibleObjectList.map((ele) => {
      return ele.object;
    });

    return result;
  }

  public update(dt: number): void {
    this.objectList.forEach((ele) => {
      ele.object.update(dt);
    });
  }

  public isActive(): boolean {
    return this.active;
  }

  public setActive(v: boolean): void {
    this.active = v;
  }

  public isVisible(): boolean {
    return this.visibility;
  }

  public setVisibility(v: boolean): void {
    this.visibility = v;
  }

  // for debug
  public getObjLength(): number {
    return this.objectList.length;
  }
}

export default Scene;
