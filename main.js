const { calculate } = require('./calculate');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const N = 1_000_000;
const a = 3;
const b = 1;
const allowNegative = false;
const exclude = [];

const map = calculate({ N, a, b, allowNegative, exclude }, (p) => {
  console.log(`${p}%`);
});

const PATH = './result';
(async () => {
  if (!fs.existsSync(PATH)) {
    await fsPromises.mkdir(PATH);
  }

  const filename = `${N}-${a}-${b}-${allowNegative ? 'negative' : 'positive'}-exclude${exclude.join(',')}.csv`;
  const data = ([
    ['N', 'min'],
    ...Array.from(map.entries()),
  ]).map(([n, min]) => `${n},${min}`);

  await fsPromises.writeFile(path.resolve(PATH, filename), data.join('\n'));
})();
