import GameScene from "../GameScene";
import Command from "./Command";

class ResumeCommand extends Command {
  private gameScene: GameScene;

  constructor(gameScene: GameScene) {
    super();
    this.gameScene = gameScene;
  }

  execute = (): void => {
    this.gameScene.resume();
  };
}

export default ResumeCommand;
