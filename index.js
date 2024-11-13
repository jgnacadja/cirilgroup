const app = require("./confs/app.json");

const { Forest } = require("./class");

const forest = new Forest(app.width, app.height, app.spreadPercent);

let t = 1;
let nb = 0;
do {
  nb = forest.getCaseinFire();
  console.log(`step: ${t} we have ${nb} case(s) in fire`);
  forest.putOutFire();
  t++;
} while (nb > 0);

console.log(`End of fire in ${t} steps`);
