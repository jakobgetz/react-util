import path from "path";
import fs from "fs";
import child_process from "child_process";
import { testConfig } from "./testConfig";

describe("test createComponent", () => {
  it("create Folder on top level", () => {
    const componentName = "Component";
    const location = "./tests/gen";
    const fileExtension = "ts";
    const fullPath = path.join(location, componentName);
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
      fs.rmdirSync(fullPath, { recursive: true });
    }
    child_process.execSync(
      `node ${testConfig.scriptLocation}createComponent.js ${componentName} ${location}`
    );

    expect(fs.existsSync(fullPath)).toBe(true);
    expect(
      fs.existsSync(`${fullPath}/${componentName}.${fileExtension}x`)
    ).toBe(true);
    expect(fs.existsSync(`${fullPath}/styles.${fileExtension}`)).toBe(true);
    expect(fs.existsSync(`${fullPath}/index.${fileExtension}`)).toBe(true);
  });
});
