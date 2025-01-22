import { Command } from "commander";
import { prjCmd } from "./prj";

export const gCmd = new Command("g")
  .description("Code generator")
  .addCommand(prjCmd);
