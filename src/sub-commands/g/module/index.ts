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
    fs.mkdirSync(path.join(modulePath, "dto"), { recursive: true });

    const moduleCapitalizedName = moduleNameToCapitalcase(moduleName);
    const moduleCamelcaseName = moduleNameToCamelcase(moduleName);

    const moduleTemplate = (await import("./template/module")).default;
    const serviceTemplate = (await import("./template/service")).default;
    const controllerTemplate = (await import("./template/controller")).default;
    const indexTemplate = (await import("./template/index")).default;
    const dtoCreateRequestTemplate = (
      await import("./template/dto/create.request")
    ).default;
    const dtoUpdateRequestTemplate = (
      await import("./template/dto/update.request")
    ).default;
    const dtoQueryTemplate = (await import("./template/dto/query")).default;
    const dtoResponseTemplate = (await import("./template/dto/response"))
      .default;
    const dtoIndexTemplate = (await import("./template/dto/index")).default;

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
    const dtoCreateRequestRendered = ejs.render(
      dtoCreateRequestTemplate.trim(),
      {
        moduleName,
        moduleCapitalizedName,
        moduleCamelcaseName,
      }
    );
    const dtoUpdateRequestRendered = ejs.render(
      dtoUpdateRequestTemplate.trim(),
      {
        moduleName,
        moduleCapitalizedName,
        moduleCamelcaseName,
      }
    );
    const dtoQueryRendered = ejs.render(dtoQueryTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });
    const dtoResponseRendered = ejs.render(dtoResponseTemplate.trim(), {
      moduleName,
      moduleCapitalizedName,
      moduleCamelcaseName,
    });
    const dtoIndexRendered = ejs.render(dtoIndexTemplate.trim(), {
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

    fs.writeFileSync(
      path.join(modulePath, `dto/create.request.ts`),
      dtoCreateRequestRendered
    );
    fs.writeFileSync(
      path.join(modulePath, `dto/update.request.ts`),
      dtoUpdateRequestRendered
    );
    fs.writeFileSync(path.join(modulePath, `dto/query.ts`), dtoQueryRendered);
    fs.writeFileSync(
      path.join(modulePath, `dto/response.ts`),
      dtoResponseRendered
    );
    fs.writeFileSync(path.join(modulePath, `dto/index.ts`), dtoIndexRendered);

    console.log(`Module ${moduleName} created at ${modulePath}`);
  });
