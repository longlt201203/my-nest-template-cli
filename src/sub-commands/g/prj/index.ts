import { input } from "@inquirer/prompts";
import { Command } from "commander";
import * as path from "path";
import * as fs from "fs";
import { execPromise } from "../../../utils";

export const prjCmd = new Command("prj")
  .description("Project generator")
  .argument("[name]", "Project name")
  .option("-s, --ssh", "Clone the project with SSH")
  .action(async (name, options) => {
    name =
      name ||
      (await input({
        message: "Project name",
      }));

    const relativeProjectFolderPath = await input({
      message: "Where do you want to create the project?",
      default: name,
    });
    const projectFolderPath = path.resolve(
      process.cwd(),
      relativeProjectFolderPath
    );

    if (fs.existsSync(projectFolderPath)) {
      throw new Error(`Folder ${projectFolderPath} already exists`);
    }

    fs.mkdirSync(projectFolderPath, { recursive: true });
    console.log("Cloning template...");

    if (options.ssh) {
      await execPromise(
        `git clone git@github.com:longlt201203/my-nest-template.git .`,
        { cwd: projectFolderPath }
      );
    } else {
      await execPromise(
        `git clone https://github.com/longlt201203/my-nest-template.git .`,
        { cwd: projectFolderPath }
      );
    }
    fs.rmSync(path.resolve(projectFolderPath, ".git"), { recursive: true });
    const pkgPath = path.resolve(projectFolderPath, "package.json");
    const pkgStr = fs.readFileSync(pkgPath).toString();
    const pkg = JSON.parse(pkgStr);
    pkg.name = name;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("Done!");
    console.log("Project created at", projectFolderPath);
  });
