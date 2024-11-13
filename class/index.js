const { state } = require("../constants");
const getRandomState = () => {
  const states = Object.values(state);
  return states[Math.floor(Math.random() * states.length)];
};

class FieldCase {
  x = 0;
  y = 0;
  state = state.clean;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = getRandomState();
  }

  updateCaseState(newState = state.clean) {
    if (this.state === state.ash) return;
    if (this.state === state.fire) {
      this.state = state.ash;
    }
    this.state = newState;
    return this;
  }

  display() {
    console.log(`x: ${this.x}, y: ${this.y}, state: ${this.state}`);
  }
}

class Forest {
  forest = [];
  width = 5;
  height = 5;
  percent = 0.25;
  constructor(width, height, spreadPercent) {
    this.width = width;
    this.height = height;
    this.percent = spreadPercent;
    this.forest = Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width }, (_, x) => new FieldCase(x, y))
    );
  }

  getCaseinFire() {
    return this.forest
      .flat()
      .filter((fieldCase) => fieldCase.state === state.fire).length;
  }

  putOutFire() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.forest[y][x].state === state.fire) {
          this.forest[y][x].updateCaseState(state.ash);
          this.spreadFire(x, y);
        }
      }
    }
  }

  getAdjacentCases(x, y) {
    const cases = [];
    if (x > 0) cases.push(this.forest[y][x - 1]);
    if (x < this.width - 1) cases.push(this.forest[y][x + 1]);
    if (y > 0) cases.push(this.forest[y - 1][x]);
    if (y < this.height - 1) cases.push(this.forest[y + 1][x]);
    return cases;
  }
  spreadFire(fromX, fromY) {
    this.getAdjacentCases(fromX, fromY)
      .filter(
        (_, index) =>
          index <
          Math.floor(this.getAdjacentCases(fromX, fromY).length * this.percent)
      )
      .forEach((fieldCase) => {
        fieldCase.updateCaseState(state.fire);
      });
  }
}

module.exports = {
  Forest,
};