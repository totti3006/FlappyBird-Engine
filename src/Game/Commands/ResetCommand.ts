import GameScene from "../GameScene";
import Command from "./Command";

class ResetCommand extends Command {
  private gameScene: GameScene;

  constructor(gameScene: GameScene) {
    super();
    this.gameScene = gameScene;
  }

  execute = (): void => {
    this.gameScene.reset();
  };
}

export default ResetCommand;
