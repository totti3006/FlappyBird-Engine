import EventHandler from "../Engine/Events/EventHandler";
import Scene from "../Engine/Scene";
import GameController from "../Engine/GameController/GameController";
import Sprite from "../Engine/GameObjects/Sprite";
import * as setting from "./settings";
import Background from "./Objects/background";
import Bird from "./Objects/bird";
import Ground from "./Objects/ground";
import PipeBottom from "./Objects/pipeBottom";
import PipeTop from "./Objects/pipeTop";
import Score from "./Objects/score";
import Title from "./Objects/title";
import GameOver from "./Objects/gameOver";
import HighScore from "./Objects/highScore";
import Message from "./Objects/message";

enum GameState {
  MainScreen = 0,
  InGame,
  EndGame,
}

class GameScene extends Scene {
  private state: GameState = GameState.MainScreen;
  private inputHandle: EventHandler = EventHandler.getInstance();

  private bird: Bird;
  private background: Background;
  private ground: Ground;
  private score_right: Score[];
  private score_left: Score[];
  private pipes: Array<[PipeTop, PipeBottom]>;
  private pipesForScore: Array<PipeTop>;
  private pipesFrequency: number;
  private title: Title;
  private gameOver: GameOver;
  private topScore: HighScore;
  private message: Message;

  private controller: GameController = GameController.getInstance();

  private static highScore: number = 0;
  private score: number = 0;

  constructor() {
    super();
    this.background = new Background();
    this.ground = new Ground();
    this.bird = new Bird();
    this.pipes = new Array<[PipeTop, PipeBottom]>();
    this.pipesForScore = new Array<PipeTop>();
    this.title = new Title();
    this.gameOver = new GameOver();
    this.topScore = new HighScore();
    this.message = new Message();
    this.pipesFrequency = 150;

    this.score_right = [];
    this.score_left = [];
    for (let i = 0; i < 10; i++) {
      this.score_right.push(new Score(`${i}`));
      this.score_left.push(new Score(`${i}`));
      this.addObject(this.score_right[i], 16);
      this.addObject(this.score_left[i], 16);
      this.score_right[i].setVisibility(false);
      this.score_left[i].setVisibility(false);

      this.score_right[i].setPosition(setting.WIDTH / 2, 20);
      this.score_left[i].setPosition(setting.WIDTH / 2 - 24, 20);
    }

    this.addObject(this.background, 10);
    this.addObject(this.ground, 30);
    this.addObject(this.bird, 20);
    this.addObject(this.title, 15);
    this.addObject(this.gameOver, 18);
    this.addObject(this.topScore, 18);
    this.addObject(this.message, 18);

    this.state = GameState.MainScreen;
  }

  public update(dt: number): void {
    super.update(dt);
    if (this.state == GameState.MainScreen) this.ready();
    else if (this.state == GameState.InGame) this.start();
    else this.end();
  }

  private ready(): void {
    // console.log("ready");
    if (this.inputHandle.isKeyDown("Space")) {
      this.state = GameState.InGame;
      this.inputHandle.popInput("Space");
      this.bird.jump();
      this.score_right[0].setVisibility(true);
      this.title.setVisibility(false);
      this.message.setVisibility(false);
    }
  }

  private start(): void {
    this.bird.fall();
    this.addPipe();
    this.handlePoint();

    if (this.inputHandle.isKeyDown("Space")) {
      this.bird.jump();
      this.inputHandle.popInput("Space");
    }

    if (this.checkCollision()) {
      this.state = GameState.EndGame;
    }
  }

  private end(): void {
    this.bird.hit();
    if (this.bird.getPosition().y < 400) {
      this.bird.fall();
    } else {
      this.bird.stop();
      if (this.score >= GameScene.highScore) GameScene.highScore = this.score;
      this.gameOver.setVisibility(true);
      this.topScore.setVisibility(true);
      this.topScore.setText(`High score: ${GameScene.highScore}`);
      this.message.setText("Press Enter to continue");
      this.message.setPosition(65, this.message.getPosition().y);
      this.message.setVisibility(true);
    }

    this.ground.stop();

    this.pipes.forEach((item) => {
      item[0].stop();
      item[1].stop();
    });

    if (this.inputHandle.isKeyDown("Enter")) {
      this.inputHandle.popInput("Enter");

      this.reset();
    }
  }

  private checkCollision(): boolean {
    // hit ground
    if (this.bird.getPosition().y >= 400) return true;

    for (let item of this.pipes) {
      if (
        this.bird.getPosition().x + this.bird.getWidth() >=
          item[0].getPosition().x &&
        this.bird.getPosition().x <=
          item[0].getPosition().x + item[0].getWidth() &&
        (this.bird.getPosition().y <=
          item[0].getPosition().y + item[0].getHeight() ||
          this.bird.getPosition().y + this.bird.getHeight() >=
            item[1].getPosition().y)
      )
        return true;
    }

    return false;
  }

  private addPipe(): void {
    if (this.pipesFrequency == 0) {
      this.pipesFrequency = 120;

      let pipeTop = new PipeTop();
      let pipeBottom = new PipeBottom();
      pipeTop.move();
      pipeBottom.move();

      let ranHight: number = Math.round(Math.random() * 150);
      let gap: number = 120;

      pipeTop.setPosition(
        pipeTop.getPosition().x,
        pipeTop.getPosition().y - ranHight
      );

      pipeBottom.setPosition(
        pipeBottom.getPosition().x,
        pipeTop.getPosition().y + pipeTop.getHeight() + gap
      );

      this.pipes.push([pipeTop, pipeBottom]);
      this.pipesForScore.push(pipeTop);

      this.addObject(pipeTop, 15);
      this.addObject(pipeBottom, 15);

      if (this.pipes[0][0].getPosition().x < -this.pipes[0][0].getWidth()) {
        this.remove(this.pipes[0][0]);
        this.remove(this.pipes[0][1]);
        this.pipes.splice(0, 1);
      }
    } else {
      this.pipesFrequency--;
    }
  }

  private handlePoint(): void {
    if (
      this.pipesForScore.length > 0 &&
      this.bird.getPosition().x >= this.pipesForScore[0].getPosition().x
    ) {
      this.score++;
      this.pipesForScore.shift();

      this.score_right[(this.score - 1) % 10].setVisibility(false);
      this.score_right[this.score % 10].setVisibility(true);

      if (this.score > 9) {
        this.score_left[Math.floor((this.score - 1) / 10)].setVisibility(false);
        this.score_left[Math.floor(this.score / 10)].setVisibility(true);
      }
    }
  }

  private reset(): void {
    this.controller.runWithScene(new GameScene());
  }
}

export default GameScene;