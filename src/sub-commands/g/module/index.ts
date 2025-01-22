import { Command } from "commander";

export const moduleCmd = new Command("module")
  .description("Module generator")
  .argument("[name]", "Module name")
  .action(async (name) => {
    console.log("Module generator", name);
  });
