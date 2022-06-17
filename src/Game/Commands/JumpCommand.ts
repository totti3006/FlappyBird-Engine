import Bird from "../Objects/bird";
import Command from "./Command";

class JumpCommand extends Command {
  private bird: Bird;

  constructor(bird: Bird) {
    super();
    this.bird = bird;
  }

  execute = (): void => {
    this.bird.jump();
  };
}

export default JumpCommand;
