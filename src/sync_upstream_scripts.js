const path = require("path")
const fs = require("fs")

const srcDir = process.env.SRC_DIR || '../playwright'

fs.copyFileSync(path.join(srcDir, "utils", "markdown.js"), path.join(__dirname, 'markdown.js'))

let documentationJsFile = fs.readFileSync(path.join(srcDir, "utils", "doclint", "documentation.js")).toString()
documentationJsFile = documentationJsFile.replace(/\.\.\/markdown/g, './markdown')
fs.writeFileSync(path.join(__dirname, 'documentation.js'), documentationJsFile)

let apiParserJsFile = fs.readFileSync(path.join(srcDir, "utils", "doclint", "api_parser.js")).toString()
apiParserJsFile = apiParserJsFile.replace(/\.\.\/markdown/g, './markdown')
fs.writeFileSync(path.join(__dirname, 'api_parser.js'), apiParserJsFile)
