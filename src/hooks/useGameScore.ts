import { useCallback, useEffect, useState } from 'react';


const INITIAL_TXNS: string[] = [];

const useGameScore = (initialBest: number) => {
  const [total, setTotal] = useState(0);
  const [best, setBest] = useState(initialBest);
  const [txns, setTxns] = useState(INITIAL_TXNS);

  const addScore = useCallback((s: number) => setTotal((t) => t + s), []);

  const appendTxn = useCallback((digests: string[]) => 
    setTxns(t => [...digests, ...t]),
    []
  );

  useEffect(() => {
    setBest((b) => (total > b ? total : b));
  }, [total]);

  return {
    total,
    best,
    txns,
    setTotal,
    addScore,
    appendTxn,
  };
};

export default useGameScore;
