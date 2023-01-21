import { useRef, useState } from 'react';
import { calculate } from '../../calculate';
import { download } from '../utils/download';

import { ArrayInput, NumberInput } from '../components/Input';
import { Progress } from '../components/Progress';

const SquareSumPage = () => {
  const [N, setN] = useState(1_000_000);
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);
  const [allowNegative, setAllowNegative] = useState(false);
  const [excludes, setExcludes] = useState<string[]>([]);
  const numberExcludes = excludes.map(v => parseInt(v));
  const [percentage, setPercentage] = useState(-1);
  const map = useRef<Map<number, number> | null>(null);

  const start = () => {
    if (a === 0 && b === 0) {
      alert('a와 b가 모두 0일 수 없음');
      return;
    }

    map.current = calculate({ N, a, b, allowNegative, exclude: numberExcludes }, setPercentage);
  };

  const _download = () => {
    if (map.current === null) return;

    map.current.delete(0);
    const result = Array.from(map.current.entries()).map(([n, min]) => `${n},${min}`);

    download({
      label: ['N', 'min'],
      data: result,
      filename: `${N}-${a}-${b}-${allowNegative ? 'negative' : 'positive'}-exclude${excludes.join(',')}`,
      ext: 'csv',
    });
  };

  return (
    <div>
      <header>
        <h1>계산기</h1>
      </header>
      <main>
        <nav>
          <ul>
            <li>
              <NumberInput min={0} value={N} onChange={setN}>N</NumberInput>
            </li>
            <li>
              <NumberInput min={0} value={a} onChange={setA}>a</NumberInput>
            </li>
            <li>
              <NumberInput min={0} value={b} onChange={setB}>b</NumberInput>
            </li>
            <li>
              <ArrayInput value={excludes} onChange={setExcludes}>제외</ArrayInput>
            </li>
            <li>
              <label>
                음수 허용
                <input
                  type="checkbox"
                  checked={allowNegative}
                  onChange={(e) => setAllowNegative(e.target.checked)}
                />
              </label>
            </li>
            <li>
              <button
                onClick={start}
                disabled={percentage !== -1 && percentage !== 100}
              >
                계산하기
              </button>
            </li>
          </ul>
        </nav>
        <Progress percentage={percentage} download={_download} />
      </main>
    </div>
  );
};

export default SquareSumPage
