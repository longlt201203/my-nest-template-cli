import { Command } from "commander";

export const dockerCmd = new Command("docker")
  .description("Docker generator")
  .argument("[name]", "Docker name")
  .action(async (name) => {
    console.log("Docker generator", name);
  });
