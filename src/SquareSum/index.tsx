import { useRef, useState } from 'react';
import { calculate } from './calculate';

const SquareSumPage = () => {
  const [N, setN] = useState(1_000_000);
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);
  const [allowNegative, setAllowNegative] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const map = useRef<Map<number, number> | null>(null);

  const start = () => {
    if (a === 0 && b === 0) {
      alert('a와 b가 모두 0일 수 없음');
      return;
    }

    map.current = calculate({ N, a, b, allowNegative }, setPercentage);
  };

  const download = () => {
    if (map.current === null) return;

    const link = document.createElement('a');

    map.current.delete(0);
    const result = Array.from(map.current.entries()).map(([n, min]) => `${n},${min}`);
    const blob = new Blob(['N,min\n' + result.join('\n')]);

    link.href = URL.createObjectURL(blob);
    link.download = `${N}-${a}-${b}-${allowNegative ? 'negative' : 'positive'}.csv`;
    link.click();
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
              <label>
                N
                <input
                  type="number"
                  min={0}
                  value={N}
                  onChange={(e) => setN(parseInt(e.target.value))}
                />
              </label>
            </li>
            <li>
              <label>
                a
                <input
                  type="number"
                  min={0}
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value))}
                />
              </label>
            </li>
            <li>
              <label>
                b
                <input
                  type="number"
                  min={0}
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value))}
                />
              </label>
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
                disabled={percentage !== 0 && percentage !== 100}
              >
                계산하기
              </button>
            </li>
          </ul>
        </nav>
        <section>
          {percentage === 0 ? (
            <h2>계산을 시작하세요</h2>
          ) : (
            <>
              <h2>{percentage === 100 ? '계산 완료' : '계산중...'}</h2>
              <progress max={100} value={percentage}>{percentage}%</progress>
            </>
          )}
        </section>
        {percentage === 100 && (
          <section>
            <h2>다운로드</h2>
            <button disabled={map.current === null} onClick={download}>다운로드</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default SquareSumPage
