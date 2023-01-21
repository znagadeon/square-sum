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

map.delete(0);

const PATH = './result';
const DIVIDE = 1_000_000;
(async () => {
  if (!fs.existsSync(PATH)) {
    await fsPromises.mkdir(PATH);
  }

  const filename = `${N}-${a}-${b}-${allowNegative ? 'negative' : 'positive'}-exclude${exclude.join(',')}`;
  const label = ['N', 'min'];
  const data = Array.from(map.entries());

  for (let i=0; i*DIVIDE < data.length; i++) {
    const file = [label, ...data.slice(i*DIVIDE, (i+1)*DIVIDE)]
      .map(([n, min]) => `${n},${min}`);

    await fsPromises.writeFile(
      path.resolve(PATH, `${filename}(${i+1}).csv`),
      file.join('\n'),
    );
  }
})();
