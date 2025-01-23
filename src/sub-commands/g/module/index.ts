import { Command } from "commander";
import { moduleNameToCamelcase, moduleNameToCapitalcase } from "../../../utils";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";

export const moduleCmd = new Command("module")
  .description("Module generator")
  .argument("<name>", "Module name")
  .action(async (name) => {
    const moduleName = name;

    const modulePath = path.join(process.cwd(), `src/modules/${moduleName}`);
    if (fs.existsSync(modulePath)) {
      throw new Error(`Module ${moduleName} already exists`);
    }
    fs.mkdirSync(modulePath, { recursive: true });

    const moduleCapitalizedName = moduleNameToCapitalcase(moduleName);
    const moduleCamelcaseName = moduleNameToCamelcase(moduleName);

    const moduleTemplate = (await import("./template/module")).default;
    const serviceTemplate = (await import("./template/service")).default;
    const controllerTemplate = (await import("./template/controller")).default;
    const indexTemplate = (await import("./template/index")).default;

    const moduleRendered = ejs.render(moduleTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });
    const serviceRendered = ejs.render(serviceTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });
    const controllerRendered = ejs.render(controllerTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });
    const indexRendered = ejs.render(indexTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });

    fs.writeFileSync(
      path.join(modulePath, `${moduleName}.module.ts`),
      moduleRendered
    );
    fs.writeFileSync(
      path.join(modulePath, `${moduleName}.service.ts`),
      serviceRendered
    );
    fs.writeFileSync(
      path.join(modulePath, `${moduleName}.controller.ts`),
      controllerRendered
    );
    fs.writeFileSync(path.join(modulePath, `index.ts`), indexRendered);

    console.log(`Module ${moduleName} created at ${modulePath}`);
  });
