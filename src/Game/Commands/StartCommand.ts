import GameScene from "../GameScene";
import Command from "./Command";

class StartCommand extends Command {
  private gameScene: GameScene;

  constructor(gameScene: GameScene) {
    super();
    this.gameScene = gameScene;
  }

  execute = (): void => {
    this.gameScene.start();
  };
}

export default StartCommand;
