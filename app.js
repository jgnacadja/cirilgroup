const express = require("express");
const app = express();

const conf = require("./confs/app.json");

const { Forest } = require("./class");

const forest = new Forest(conf.width, conf.height, conf.spreadPercent);

app.get("/", (req, res) => {
  let t = 1;
  let nb = 0;
  do {
    nb = forest.getCaseinFire();
    res.write(forest.printForest());
    forest.putOutFire();
    t++;
  } while (nb > 0);
  res.write("<br/>");
  res.end(`<div style='display:block'>End of fire in ${t} steps</div>`);
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
