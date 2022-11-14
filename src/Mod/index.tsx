import { useState } from 'react';
import { NumberInput, ArrayInput } from '../components/Input';
import { calculate, CalculateReturnType } from './calculate';

const ModPage = () => {
  const [N, setN] = useState(1_000);
  const [mod, setMod] = useState(9);
  const [targets, setTargets] = useState<string[]>(['3', '6']);
  const numberTargets = targets.map(v => parseInt(v));

  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<CalculateReturnType | null>(null);

  const start = () => {
    setStarted(true);
    setResult(calculate(N, mod, numberTargets));
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
          {!started && (
            <h2>계산을 시작하세요</h2>
          )}
          {started && !result && (
            <h2>계산중...</h2>
          )}
          {started && result && (
            <>
              <h2>계산 완료</h2>
              <p>{JSON.stringify(result, null, 2)}</p>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ModPage
