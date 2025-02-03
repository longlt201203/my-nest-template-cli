import { Command } from "commander";

const presets = ["mongo", "mysql", "mssql", "postgres", "redis", "zipkin"];

export const lsCmd = new Command("ls")
  .description("List all presets")
  .action(() => {
    console.log("Available presets:");
    console.log(presets.join("\n"));
  });
