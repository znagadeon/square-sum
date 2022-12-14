import { useRef, useState } from 'react';
import { NumberInput, ArrayInput } from '../components/Input';
import { calculate, CalculateReturnType } from './calculate';
import { download } from '../utils/download';
import { Progress } from '../components/Progress';

const ModPage = () => {
  const [N, setN] = useState(1_000_000);
  const [mod, setMod] = useState(9);
  const [targets, setTargets] = useState<string[]>(['3', '6']);
  const numberTargets = targets.map(v => parseInt(v));

  const [percentage, setPercentage] = useState(-1);

  const map = useRef(new Map<number, CalculateReturnType>())

  const start = () => {
    for (let i=1; i<=N; i++) {
      requestIdleCallback(() => {
        const result = calculate(i, mod, numberTargets);
        if (import.meta.env.MODE === 'development') {
          console.log(i, result);
        }
        map.current.set(i, result);

        const _percentage = Math.floor(i * 100 / N);
        if (_percentage > percentage) {
          setPercentage(_percentage);
        }
      });
    }
  };

  const _download = () => {
    const result = Array.from(map.current.entries())
      .map(([N, [a, b, c]]) => `${N},${a},${b},${c}`);

    download({
      label: ['N', 'a', 'b', 'c'],
      data: result,
      filename: `${N}-mod${mod}-target${targets.join(',')}`,
      ext: 'csv',
    });
  };

  return (
    <div>
      <header>
        <h1>MOD f({N}, {mod}, {JSON.stringify(numberTargets)})</h1>
      </header>
      <main>
        <nav>
          <ul>
            <li>
              <NumberInput value={N} onChange={setN}>N</NumberInput>
            </li>
            <li>
              <NumberInput value={mod} onChange={setMod}>mod</NumberInput>
            </li>
            <li>
              <ArrayInput value={targets} onChange={setTargets}>target</ArrayInput>
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

export default ModPage
