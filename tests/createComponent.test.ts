import path from "path";
import fs from "fs";
import child_process from "child_process";
import { testConfig } from "./testConfig";

describe("test createComponent", () => {
  it("create Folder on top level", () => {
    const componentName = "Component";
    const location = testConfig.gen;
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

  it("create Folder on a deeper level", () => {
    const componentName = "Component2";
    const location = testConfig.gen + "deep";
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

  it("use js extension and no location", () => {
    const componentName = "JsComponent";
    const location = ".";
    const fileExtension = "js";
    const fullPath = path.join(location, componentName);
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
      fs.rmdirSync(fullPath, { recursive: true });
    }
    child_process.execSync(
      `node ${testConfig.scriptLocation}createComponent.js ${componentName} -e ${fileExtension}`
    );

    expect(fs.existsSync(fullPath)).toBe(true);
    expect(
      fs.existsSync(`${fullPath}/${componentName}.${fileExtension}x`)
    ).toBe(true);
    expect(fs.existsSync(`${fullPath}/styles.${fileExtension}`)).toBe(true);
    expect(fs.existsSync(`${fullPath}/index.${fileExtension}`)).toBe(true);

    fs.rmdirSync(fullPath, { recursive: true });
  });
});
