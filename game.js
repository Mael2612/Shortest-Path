const fs = require("fs");
const easyMap = "./simple.map";
let map = fs
  .readFileSync(easyMap, "utf8")
  .split("\n")
  .map((line) => line.split(""));
let FinalSet = new Set();
const directions = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

class Point {
  constructor(abs, ord, link = null) {
    this.abs = abs;
    this.ord = ord;
    this.link = link;
  }
}

let StarterPoint, arrivalPoint;

function cheminPlusCourt(map) {}
for (let x = 0; x < map.length; x++) {
  for (let y = 0; y < map[x].length; y++) {
    if (map[x][y] === "S") {
      StarterPoint = new Point(x, y);
      console.log(`Start at : (${x}, ${y})`);
    } else if (map[x][y] === "E") {
      arrivalPoint = new Point(x, y);
      console.log(`Arrival found at : (${x}, ${y})`);
    }
  }
}

function tracePath(points) {
  const path = [];
  while (points) {
    path.push(`${points.abs}:${points.ord}`);
    points = points.link;
  }
  return path.join(" ");
}

let queueTemp = [StarterPoint];
FinalSet.add(`${StarterPoint?.abs},${StarterPoint?.ord}`);

while (queueTemp.length > 0) {
  const current = queueTemp.shift();

  if (current.abs === arrivalPoint.abs && current.ord === arrivalPoint.ord) {
    console.log("Path found:", tracePath(current));
    break;
  }

  for (const { dx, dy } of directions) {
    const nx = current?.abs + dx;
    const ny = current?.ord + dy;
    const key = `${nx},${ny}`;

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < map.length &&
      ny < map[0].length &&
      (map[nx][ny] === "." || map[nx][ny] === "E") &&
      !FinalSet.has(key)
    ) {
      const neighbor = new Point(nx, ny, current);
      queueTemp.push(neighbor);
      FinalSet.add(key);
      console.log(FinalSet);
      console.log(FinalSet.size);
    }
  }
}
