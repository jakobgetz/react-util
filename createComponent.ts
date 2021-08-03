import process from "process";
import fs from "fs";
import path from "path";

const componentName = process.argv[2];
const location = process.argv[3] ? process.argv[3] : ".";
const fullPath = path.join(location, componentName);
const stylesName = "styles";
// const fileExtension = process.arv[4] === "js" ? "js" : "ts";
const fileExtension = "ts";

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
  `import react, { FC } from "react";
import * from "./${stylesName}";
  
    export const ${componentName}:FC = () => {
        return (
            <>

            </>
        )
    }`
);
componentStream.close();

// write styles.ts
const stylesStream = fs.createWriteStream(
  `${fullPath}/${stylesName}.${fileExtension}`
);
stylesStream.write(`import styled from "styled-components"

`);
stylesStream.close();

// write index.ts
const indexStream = fs.createWriteStream(`${fullPath}/index.${fileExtension}`);
indexStream.write(`export * from "./${componentName};`);
indexStream.close();
