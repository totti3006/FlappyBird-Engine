// import EventHandler from "../Engine/EventHandler/EventHandler";
import InputHandler from "../Engine/EventHandler/InputHandler";
import Scene from "../Engine/Scene";
import GameController from "../Engine/GameController/GameController";
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
import StartCommand from "./Commands/StartCommand";
import JumpCommand from "./Commands/JumpCommand";
import PauseCommand from "./Commands/PauseCommand";
import ResumeCommand from "./Commands/ResumeCommand";
import ResetCommand from "./Commands/ResetCommand";

enum GameState {
  Ready = 0,
  Playing,
  Pausing,
  Dying,
  EndGame,
}

class GameScene extends Scene {
  private state: GameState = GameState.Ready;

  private bird: Bird;
  private background: Background;
  private ground: Ground;
  private score_right: Score[];
  private score_left: Score[];
  private pipes: Array<[PipeTop, PipeBottom]>;
  private pipesFrequency: number;
  private title: Title;
  private gameOver: GameOver;
  private topScore: HighScore;
  private message: Message;

  private controller: GameController = GameController.getInstance();

  private static highScore: number = 0;
  private score: number = 0;

  private startCommand: StartCommand;
  private jumbCommand: JumpCommand;
  private pauseCommand: PauseCommand;
  private resumeCommand: ResumeCommand;
  private resetCommand: ResetCommand;

  constructor() {
    super();
    this.background = new Background();
    this.ground = new Ground();
    this.bird = new Bird();
    this.pipes = new Array<[PipeTop, PipeBottom]>();
    this.title = new Title();
    this.gameOver = new GameOver();
    this.topScore = new HighScore();
    this.message = new Message();
    this.pipesFrequency = 120;

    this.score_right = [];
    this.score_left = [];

    this.startCommand = new StartCommand(this);
    this.jumbCommand = new JumpCommand(this.bird);
    this.pauseCommand = new PauseCommand(this);
    this.resumeCommand = new ResumeCommand(this);
    this.resetCommand = new ResetCommand(this);

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

    // EventHandler.addEventListener("keydown", this.start, "Space");
    InputHandler.addEventListener(this.startCommand, "Space");
  }

  public update(dt: number): void {
    super.update(dt);

    if (this.state == GameState.Ready) {
    } else if (this.state == GameState.Playing) {
      this.checkCollision();
      this.handlePoint();
      if (this.pipesFrequency == 0) {
        this.pipesFrequency = 120;
        this.addPipe();
        this.removePipe();
      } else {
        this.pipesFrequency--;
      }

      this.bird.handleFall();
    } else if (this.state == GameState.Pausing) {
    } else if (this.state == GameState.Dying) {
      this.bird.handleFall();
      if (this.bird.getPosition().y >= 400) {
        this.end();
      }
    } else if (this.state == GameState.EndGame) {
    }
  }

  public start = (): void => {
    // EventHandler.removeEventListener("keydown", this.start, "Space");
    // EventHandler.addEventListener("keydown", this.bird.jump, "Space");
    // EventHandler.addEventListener("keydown", this.pause, "KeyP");
    InputHandler.removeEventListener(this.startCommand, "Space");
    InputHandler.addEventListener(this.jumbCommand, "Space");
    InputHandler.addEventListener(this.pauseCommand, "KeyP");
    this.state = GameState.Playing;
    this.bird.jump();
    this.score_right[0].setVisibility(true);
    this.title.setVisibility(false);
    this.message.setVisibility(false);
  };

  private end(): void {
    this.bird.stop();

    if (this.score >= GameScene.highScore) GameScene.highScore = this.score;
    this.gameOver.setVisibility(true);
    this.topScore.setVisibility(true);
    this.topScore.setText(`High score: ${GameScene.highScore}`);
    this.message.setText("Press Enter to continue");
    this.message.setPosition(65, this.message.getPosition().y);
    this.message.setVisibility(true);

    this.state = GameState.EndGame;
    // EventHandler.addEventListener("keydown", this.reset, "Enter");
    InputHandler.addEventListener(this.resetCommand, "Enter");
  }

  private checkCollision(): void {
    for (let item of this.pipes) {
      if (
        (this.bird.getPosition().x + this.bird.getWidth() >=
          item[0].getPosition().x &&
          this.bird.getPosition().x <=
            item[0].getPosition().x + item[0].getWidth() &&
          (this.bird.getPosition().y <=
            item[0].getPosition().y + item[0].getHeight() ||
            this.bird.getPosition().y + this.bird.getHeight() >=
              item[1].getPosition().y)) ||
        this.bird.getPosition().y >= 400
      ) {
        // EventHandler.removeEventListener("keydown", this.bird.jump, "Space");
        // EventHandler.removeEventListener("keydown", this.pause, "KeyP");
        InputHandler.removeEventListener(this.jumbCommand, "Space");
        InputHandler.removeEventListener(this.pauseCommand, "KeyP");
        this.state = GameState.Dying;
        this.bird.hit();
        this.ground.stop();

        this.pipes.forEach((item) => {
          item[0].stop();
          item[1].stop();
        });
      }
    }
  }

  private addPipe(): void {
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

    this.addObject(pipeTop, 15);
    this.addObject(pipeBottom, 15);
  }

  private removePipe(): void {
    if (this.pipes[0][0].getPosition().x < -this.pipes[0][0].getWidth()) {
      this.remove(this.pipes[0][0]);
      this.remove(this.pipes[0][1]);
      this.pipes.splice(0, 1);
    }
  }

  private handlePoint(): void {
    for (let item of this.pipes) {
      if (
        this.bird.getPosition().x >= item[0].getPosition().x &&
        !item[0].isPassed()
      ) {
        this.score++;
        item[0].setPassed(true);

        this.score_right[(this.score - 1) % 10].setVisibility(false);
        this.score_right[this.score % 10].setVisibility(true);

        if (this.score > 9) {
          this.score_left[Math.floor((this.score - 1) / 10)].setVisibility(
            false
          );
          this.score_left[Math.floor(this.score / 10)].setVisibility(true);
        }
      }
    }
  }

  public pause = (): void => {
    // EventHandler.addEventListener("keydown", this.resume, "Space");
    InputHandler.addEventListener(this.resumeCommand, "Space");
    this.state = GameState.Pausing;
    this.bird.pause();
    this.ground.pause();
    this.pipes.forEach((item) => {
      item[0].pause();
      item[1].pause();
    });
  };

  public resume = (): void => {
    // EventHandler.removeEventListener("keydown", this.resume, "Space");
    InputHandler.removeEventListener(this.resumeCommand, "Space");

    this.state = GameState.Playing;
    this.bird.resume();
    this.ground.resume();
    this.pipes.forEach((item) => {
      item[0].resume();
      item[1].resume();
    });
  };

  public reset = (): void => {
    // EventHandler.removeEventListener("keydown", this.reset, "Enter");
    InputHandler.removeEventListener(this.resetCommand, "Enter");
    this.controller.runWithScene(new GameScene());
  };
}

export default GameScene;
