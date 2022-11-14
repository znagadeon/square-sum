import { ReactNode } from 'react';

export const NumberInput = (
  { children, value, onChange, min }
  : { children?: ReactNode, value: number, onChange: (v: number) => void, min?: number }
) => {
  return (
    <label>
      <span>{children} </span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </label>
  );
};

export const ArrayInput = (
  { children, value, onChange }
  : { children?: ReactNode, value: string[], onChange: (v: string[]) => void }
) => {
  return (
    <label>
      <span>{children} (콤마로 구분)</span>
      <input
        type="text"
        value={value.join(',')}
        onChange={(e) => onChange(e.target.value.split(','))}
      />
    </label>
  );
};
