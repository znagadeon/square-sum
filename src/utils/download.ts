type Parameter = {
  label: string[],
  data: string[],
  filename: string,
  ext: string,
};

const DIVIDE = 1_000_000;

export const download = ({ label, data, filename, ext }: Parameter) => {
  const link = document.createElement('a');

  for (let i=0; i*DIVIDE<data.length; i++) {
    const blob = new Blob([label.join(',') + '\n' + data.slice(i * DIVIDE, (i+1) * DIVIDE).join('\n')]);

    link.href = URL.createObjectURL(blob);
    link.download = `${filename}(${i+1}).${ext}`;
    link.click();
  }
};
