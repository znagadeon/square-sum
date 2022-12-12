export const Progress = ({ percentage, download }: { percentage: number, download: () => void }) => {
  return (
    <section>
      {percentage === -1 && (
        <h2>계산을 시작하세요</h2>
      )}
      {(0 <= percentage && percentage < 100) && (
        <>
          <h2>계산중... {percentage}%</h2>
          <progress max={100} value={percentage}>{percentage}%</progress>
        </>
      )}
      {percentage === 100 && (
        <>
          <h2>계산 완료</h2>
          <button onClick={download}>다운로드</button>
        </>
      )}
    </section>
  )
};
