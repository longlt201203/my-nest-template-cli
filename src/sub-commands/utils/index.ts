import { Command } from "commander";
import { updateEnvCmd } from "./update-env";

export const utilsCmd = new Command("utils")
  .description("Utilities")
  .addCommand(updateEnvCmd);
