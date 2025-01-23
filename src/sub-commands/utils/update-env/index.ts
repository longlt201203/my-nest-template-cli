import { Command } from "commander";
import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as ejs from "ejs";

export const updateEnvCmd = new Command("update-env")
  .description("Update src/utils/env.ts base on .env.example file")
  .action(async () => {
    const dotenvExamplePath = path.join(process.cwd(), ".env.example");
    if (!fs.existsSync(dotenvExamplePath)) {
      throw new Error("No .env.example file found");
    }
    const envTsTemplate = (await import("./template/env")).default;
    const envObj = dotenv.parse(fs.readFileSync(dotenvExamplePath));
    const envTsContent = ejs.render(envTsTemplate, {
      envLines: Object.keys(envObj).map((key) => {
        if (Number(envObj[key])) {
          return `\t${key}: Number(process.env.${key} || "0")`;
        }
        if (envObj[key] === "true" || envObj[key] === "false") {
          return `\t${key}: process.env.${key} === "true"`;
        }
        return `\t${key}: process.env.${key} || ""`;
      }),
    });
    const envTsPath = path.join(process.cwd(), "src/utils/env.ts");
    fs.writeFileSync(envTsPath, envTsContent);
    console.log("src/utils/env.ts updated");
  });
