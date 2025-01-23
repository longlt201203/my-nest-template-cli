import * as path from "path";
import * as fs from "fs";

export function readPackageJson() {
  const filepath = path.join(process.cwd(), "package.json");
  const str = fs.readFileSync(filepath).toString();
  return JSON.parse(str);
}
