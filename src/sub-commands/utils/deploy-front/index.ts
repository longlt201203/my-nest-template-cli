import { Command } from "commander";
import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

export const deployFrontCmd = new Command("deploy-front")
  .description("Add front deployment module")
  .action(async () => {
    const frontModulePath = path.join(process.cwd(), "src/modules/front");
    if (fs.existsSync(frontModulePath))
      throw new Error("Front module already existed!");
    fs.mkdirSync(frontModulePath);
    fs.mkdirSync(path.join(frontModulePath, "dto"));

    const indexTemplate = (await import("./template/index")).default;
    const moduleTemplate = (await import("./template/front.module")).default;
    const serviceTemplate = (await import("./template/front.service")).default;
    const controllerTemplate = (await import("./template/front.controller"))
      .default;
    const dtoIndexTemplate = (await import("./template/dto/index")).default;
    const dtoDeployTemplate = (await import("./template/dto/deploy.dto"))
      .default;

    const indexRendered = ejs.render(indexTemplate);
    const moduleRendered = ejs.render(moduleTemplate);
    const serviceRendered = ejs.render(serviceTemplate);
    const controllerRendered = ejs.render(controllerTemplate);
    const dtoIndexRendered = ejs.render(dtoIndexTemplate);
    const dtoDeployRendered = ejs.render(dtoDeployTemplate);

    fs.writeFileSync(path.join(frontModulePath, "index.ts"), indexRendered);
    fs.writeFileSync(
      path.join(frontModulePath, "front.module.ts"),
      moduleRendered
    );
    fs.writeFileSync(
      path.join(frontModulePath, "front.service.ts"),
      serviceRendered
    );
    fs.writeFileSync(
      path.join(frontModulePath, "front.controller.ts"),
      controllerRendered
    );
    fs.writeFileSync(
      path.join(frontModulePath, "dto", "index.ts"),
      dtoIndexRendered
    );
    fs.writeFileSync(
      path.join(frontModulePath, "dto", "deploy.dto.ts"),
      dtoDeployRendered
    );
  });
