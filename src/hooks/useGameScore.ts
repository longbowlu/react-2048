import { useCallback, useEffect, useState } from 'react';

const useGameScore = (initialBest: number) => {
  const [total, setTotal] = useState(0);
  const [best, setBest] = useState(initialBest);
  const [totalTxn, setTotalTxn] = useState(0);

  const addScore = useCallback((s: number) => setTotal((t) => t + s), []);

  const incrementTotalTxnCount = useCallback((diff: number) => 
    setTotalTxn((t) => t + diff), []);

  // const incrementTotalTxnCount = useCallback((diff: number) => {
  //   console.log('before total:', totalTxn);
  //   // setTotalTxn(totalTxn + diff);
  //   setTotalTxn((t) => t + diff);
  //   console.log('after total:', totalTxn);
  //   return {};
  // }, [totalTxn])

  useEffect(() => {
    setBest((b) => (total > b ? total : b));
  }, [total]);

  return {
    total,
    best,
    totalTxn,
    setTotal,
    addScore,
    incrementTotalTxnCount,
  };
};

export default useGameScore;
