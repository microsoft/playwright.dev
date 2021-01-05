const { main } = require("./utils");

const { SRC_DIR } = process.env;
const versions = [
  undefined, // master
  "1.7.0",
  "1.6.0",
  "1.5.0",
  "1.4.0",
  "1.3.0",
  "1.2.0",
  "1.1.0",
  "1.0.0",
];
versions.forEach((version) => {
  main(SRC_DIR, version);
});
