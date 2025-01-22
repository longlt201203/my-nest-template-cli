#!/usr/bin/env node

import { program } from "commander";
import { gCmd } from "./sub-commands/g";

program.addCommand(gCmd);

program.parse();

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 until next time!");
  } else {
    // Rethrow unknown errors
    throw error;
  }
});
