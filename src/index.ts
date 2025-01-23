#!/usr/bin/env node

import { program } from "commander";
import { gCmd } from "./sub-commands/g";
import { utilsCmd } from "./sub-commands/utils";

program.addCommand(gCmd).addCommand(utilsCmd);

program.parse();

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 until next time!");
  } else {
    // Rethrow unknown errors
    throw error;
  }
});
