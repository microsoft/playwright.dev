const { main } = require("./utils");

const { SRC_DIR } = process.env;
const versions = [
  undefined, // master
  "1.6.2",
  "1.6.1",
  "1.6.0",
  "1.5.2",
  "1.5.1",
  "1.5.0",
  "1.4.2",
  "1.4.1",
  "1.4.0",
  "1.3.0",
  "1.2.1",
  "1.2.0",
  "1.1.1",
  "1.1.0",
  "1.0.2",
  "1.0.1",
  "1.0.0",
  "0.18.0",
];
versions.forEach((version) => {
  main(SRC_DIR, version);
});
