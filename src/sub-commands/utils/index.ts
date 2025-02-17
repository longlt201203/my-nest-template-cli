import { Command } from "commander";
import { updateEnvCmd } from "./update-env";
import { deployFrontCmd } from "./deploy-front";

export const utilsCmd = new Command("utils")
  .description("Utilities")
  .addCommand(updateEnvCmd)
  .addCommand(deployFrontCmd);
