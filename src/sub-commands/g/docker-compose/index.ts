import { readPackageJson } from "../../../utils";
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import * as ejs from "ejs";

export const dockerComposeCmd = new Command("docker-compose")
  .description("Docker compose generator")
  .argument("<preset>", "Docker compose preset")
  .action(async (preset) => {
    const pkg = readPackageJson();
    if (!pkg.name) {
      throw new Error("No package name found in package.json");
    }

    const presetPath = `docker-compose-presets/${preset}.ejs`;
    if (!fs.existsSync(presetPath)) {
      throw new Error(`Preset ${preset} not found`);
    }
    const presetRendered = await ejs.renderFile(presetPath, {
      projectName: pkg.name,
    });
    const composePath = path.resolve(
      process.cwd(),
      `docker-compose.${preset}.yaml`
    );
    fs.writeFileSync(composePath, presetRendered);
    console.log(`Docker compose file generated at ${composePath}`);
  });
