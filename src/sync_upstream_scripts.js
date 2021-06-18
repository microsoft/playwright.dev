const path = require("path")
const fs = require("fs")

if (!process.env.SRC_DIR)
  throw new Error(`'SRC_DIR' environment variable needs to be set`);

fs.copyFileSync(path.join(process.env.SRC_DIR, "utils", "markdown.js"), path.join(__dirname, 'markdown.js'))

let documentationJsFile = fs.readFileSync(path.join(process.env.SRC_DIR, "utils", "doclint", "documentation.js")).toString()

documentationJsFile = documentationJsFile.replace(/\.\.\/markdown/g, './markdown')

fs.writeFileSync(path.join(__dirname, 'documentation.js'), documentationJsFile)
