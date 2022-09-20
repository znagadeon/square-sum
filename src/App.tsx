import { useRef, useState } from 'react';

const App = () => {
  const [n, setN] = useState(10_000_000);
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);

  const map = useRef(new Map<number, number>()).current;

  map.set(0, 0); // test

  const download = () => {
    const link = document.createElement('a');
    const result = Array.from(map.entries()).map(([N, min]) => `${N}\t${min}`);
    const blob = new Blob(['N\tmin\n' + result.join('\n')]);
    link.href = URL.createObjectURL(blob);
    link.download = `${n}-${a}-${b}.tsv`;
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
                N <input type="number" min={0} max={1_000_000} />
              </label>
            </li>
            <li>
              <label>
                a <input type="number" />
              </label>
            </li>
            <li>
              <label>
                b <input type="number" />
              </label>
            </li>
            <li>
              <label>
                음수 허용 <input type="checkbox" />
              </label>
            </li>
            <li>
              <button disabled={true}>계산하기</button>
            </li>
          </ul>
        </nav>
        <section>
          <h2>계산중...</h2>
          <progress max={100} value={10}>10%</progress>
        </section>
        <section>
          <h2>다운로드</h2>
          <button disabled={false} onClick={download}>다운로드</button>
        </section>
        <section>
          <h2>조회하기</h2>
          <label>
            N <input type="number" />
          </label>
          <button disabled={true}>조회하기</button>
          <p>
            66의 min은 3, square-sum에 사용된 숫자는 1, 4, 7입니다.
          </p>
        </section>
      </main>
    </div>
  );
};

export default App
