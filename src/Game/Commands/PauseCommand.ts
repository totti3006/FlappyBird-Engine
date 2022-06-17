import GameScene from "../GameScene";
import Command from "./Command";

class PauseCommand extends Command {
  private gameScene: GameScene;

  constructor(gameScene: GameScene) {
    super();
    this.gameScene = gameScene;
  }

  execute = (): void => {
    this.gameScene.pause();
  };

  undo = (): void => {
    this.gameScene.resume();
  };
}

export default PauseCommand;
