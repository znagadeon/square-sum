export const download = ({ data, filename }: { data: string, filename: string }) => {
  const link = document.createElement('a');

  const blob = new Blob([data]);

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
