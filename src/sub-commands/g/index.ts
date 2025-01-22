import { Command } from "commander";
import { prjCmd } from "./prj";
import { moduleCmd } from "./module";
import { dockerCmd } from "./docker";

export const gCmd = new Command("g")
  .description("Code generator")
  .addCommand(prjCmd)
  .addCommand(moduleCmd)
  .addCommand(dockerCmd);
