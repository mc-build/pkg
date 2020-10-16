const fs = require("fs");
const path = require("path");
try {
  fs.mkdirSync("./out");
  fs.mkdirSync("./out/lib");
  fs.mkdirSync("./out/lang");
} catch (e) {
  console.log("unable to make out dir");
}
const libs = Object.assign(
  {},
  ...fs.readdirSync("./libraries").map((_) => {
    let lib = require("../libraries/" + _);
    fs.writeFileSync(path.resolve("out", "lib", _), JSON.stringify(lib));
    return { [_.replace(".json", "")]: lib };
  })
);

const langs = Object.assign(
  {},
  ...fs.readdirSync("./languages").map((_) => {
    let lang = require("../languages/" + _);
    fs.writeFileSync(path.resolve("out", "lang", _), JSON.stringify(lang));
    return { [_.replace(".json", "")]: lang };
  })
);

fs.writeFileSync(
  path.resolve("out", "catalog.json"),
  JSON.stringify({ libs: Object.keys(libs), langs: Object.keys(langs) })
);
