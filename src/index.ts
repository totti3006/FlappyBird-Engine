import LoadImg from "./Game/LoadImg";
import * as setting from "./Game/settings";
import GameController from "./Engine/GameController/GameController";
import GameScene from "./Game/GameScene";

require("./assets/background.png");
require("./assets/foreground.png");
require("./assets/bluebird-downflap.png");
require("./assets/bluebird-midflap.png");
require("./assets/bluebird-upflap.png");
require("./assets/pipe-top.png");
require("./assets/pipe-bottom.png");
require("./assets/title.png");
require("./assets/gameover.png");
require("./assets/0.png");
require("./assets/1.png");
require("./assets/2.png");
require("./assets/3.png");
require("./assets/4.png");
require("./assets/5.png");
require("./assets/6.png");
require("./assets/7.png");
require("./assets/8.png");
require("./assets/9.png");

function setup(): void {
  let canvas: HTMLCanvasElement = document.getElementById(
    "maingame"
  ) as HTMLCanvasElement;
  canvas.setAttribute("width", setting.WIDTH as unknown as string);
  canvas.setAttribute("height", setting.HEIGHT as unknown as string);

  let gameController = GameController.getInstance();
  let gamePlay = new GameScene();
  gameController.runWithScene(gamePlay);
  gameController.start();
}

function loadImage(): void {
  let imgLoader = LoadImg.getInstance();
  imgLoader.push(setting.BACKGROUND, "./background.png");
  imgLoader.push(setting.GROUND, "./foreground.png");
  imgLoader.push(setting.BIRD_DOWN, "./bluebird-downflap.png");
  imgLoader.push(setting.BIRD_MID, "./bluebird-midflap.png");
  imgLoader.push(setting.BIRD_UP, "./bluebird-upflap.png");
  imgLoader.push(setting.PIPE_TOP, "./pipe-top.png");
  imgLoader.push(setting.PIPE_BOTTOM, "./pipe-bottom.png");
  imgLoader.push(setting.TITLE, "./title.png");
  imgLoader.push(setting.GAMEOVER, "./gameover.png");
  imgLoader.push(setting.ZERO, "./0.png");
  imgLoader.push(setting.ONE, "./1.png");
  imgLoader.push(setting.TWO, "./2.png");
  imgLoader.push(setting.THREE, "./3.png");
  imgLoader.push(setting.FOUR, "./4.png");
  imgLoader.push(setting.FIVE, "./5.png");
  imgLoader.push(setting.SIX, "./6.png");
  imgLoader.push(setting.SEVEN, "./7.png");
  imgLoader.push(setting.EIGHT, "./8.png");
  imgLoader.push(setting.NINE, "./9.png");
}

loadImage();
window.onload = () => {
  setup();
};
