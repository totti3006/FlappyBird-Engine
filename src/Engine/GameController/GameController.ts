import EventHandler from "../Events/EventHandler";
import Renderer from "../Renderer/renderer";
import Scene from "../Scene";
import { sleep } from "../Math/Sleep";

class GameController {
  private static instance: GameController;

  private canvas: HTMLCanvasElement;

  private renderer: Renderer;

  private eventHandler: EventHandler;

  private scene: Scene | null = null;

  private lastTime: number;
  private rAF_ID: number = 0;

  private constructor() {
    this.canvas = document.getElementById("maingame") as HTMLCanvasElement;
    this.renderer = Renderer.getInstance();
    this.eventHandler = EventHandler.getInstance();
    this.lastTime = window.performance.now();
  }

  public static getInstance(): GameController {
    if (!GameController.instance) {
      GameController.instance = new GameController();
    }
    return GameController.instance;
  }

  public runWithScene(scene: Scene): void {
    this.scene = scene;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public start(): void {
    // this.eventHandler.handle();
    this.rAF_ID = requestAnimationFrame(() => this.gameLoop());
  }

  private gameLoop(): void {
    const time: number = window.performance.now();
    const delta: number = time - this.lastTime;
    this.lastTime = time;

    console.log(delta);
    // event handle

    // update
    this.scene!.update(delta);
    // render
    // console.log(this.scene!.getAllVisibleObject());
    this.renderer.drawAll(this.scene!.getAllVisibleObject());

    // sleep
    sleep(time + 1000 / 60 - window.performance.now());

    this.rAF_ID = requestAnimationFrame(() => this.gameLoop());
  }
}

export default GameController;
