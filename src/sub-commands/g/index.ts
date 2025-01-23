import { Command } from "commander";
import { prjCmd } from "./prj";
import { moduleCmd } from "./module";
import { dockerComposeCmd } from "./docker-compose";

export const gCmd = new Command("g")
  .description("Code generator")
  .addCommand(prjCmd)
  .addCommand(moduleCmd)
  .addCommand(dockerComposeCmd);
