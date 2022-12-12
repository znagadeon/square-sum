import { useRef, useState } from 'react';
import { NumberInput, ArrayInput } from '../components/Input';
import { calculate, CalculateReturnType } from './calculate';
import { download } from '../utils/download';

const ModPage = () => {
  const [N, setN] = useState(1_000_000);
  const [mod, setMod] = useState(9);
  const [targets, setTargets] = useState<string[]>(['3', '6']);
  const numberTargets = targets.map(v => parseInt(v));

  const [percentage, setPercentage] = useState(0);

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
      data: 'N,a,b,c\n' + result.join('\n'),
      filename: `${N}-mod${mod}-target${targets.join(',')}.csv`,
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
              <button onClick={start}>계산하기</button>
            </li>
          </ul>
        </nav>
        <section>
          {percentage === 0 && (
            <h2>계산을 시작하세요</h2>
          )}
          {(0 < percentage && percentage < 100) && (
            <>
              <h2>계산중... {percentage}%</h2>
              <progress max={100} value={percentage}>{percentage}%</progress>
            </>
          )}
          {percentage === 100 && (
            <>
              <h2>계산 완료</h2>
              <button onClick={_download}>다운로드</button>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ModPage
