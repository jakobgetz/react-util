import process from "process";
import fs from "fs";
import path from "path";
import { resolveParameters } from "./separateParameters";

const componentName = process.argv[2];
const location =
  process.argv[3] && !process.argv[3].startsWith("-") ? process.argv[3] : ".";
const paramsResolved = resolveParameters(process.argv);
const fullPath = path.join(location, componentName);
const stylesName = "styles";
let fileExtension = "ts";

// validate params
paramsResolved.forEach((p: any) => {
  if ("-e" || "--e" || "--extension" || "-extension" in p) {
    fileExtension = p[Object.keys(p)[0]];
  } else {
    throw new Error(`Invalid parameter ${p}`);
  }
});

console.log(`Creating Component ${componentName} at ${location}`);

if (fs.existsSync(fullPath)) {
  throw new Error(`Component ${componentName} at ${location} already exists`);
}
fs.mkdirSync(fullPath, { recursive: true });

// write jsx component
const componentStream = fs.createWriteStream(
  `${fullPath}/${componentName}.${fileExtension}x`
);
componentStream.write(
  `import react${fileExtension === "ts" ? ", { FC } " : " "}from "react";
  
export const ${componentName}${fileExtension === "ts" ? ": FC " : " "}= () => {
    return (
        <>

        </>
    )
};`
);
componentStream.close();

// write styles.ts
const stylesStream = fs.createWriteStream(
  `${fullPath}/${stylesName}.${fileExtension}`
);
stylesStream.write(`import styled from "styled-components";

`);
stylesStream.close();

// write index.ts
const indexStream = fs.createWriteStream(`${fullPath}/index.${fileExtension}`);
indexStream.write(`export * from "./${componentName}";`);
indexStream.close();
