import { useCallback, useRef, useState } from 'react';
import { ArrowKeyType } from '../utils/types';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const MAX_SMASH_KEYS = 500;
const INTERNAL_MS = 100;
const INITIAL_KEYS: ArrowKeyType[] = [];

const MAPPING = new Map<number, ArrowKeyType>([
  [0, "ArrowLeft"],
  [1, "ArrowRight"],
  [2, "ArrowUp"],
  [3, "ArrowDown"],
]);

const useSmashGenerator = () => {
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const shouldGenerateSmashKeys = useRef(true);

  const addKeys = useCallback((key: ArrowKeyType) => 
    setKeys(k => [...k, key]),
    []
  );
  const consumeKeys = useCallback(() => {
    const key = keys.pop();
    setKeys(keys);
    return key;
  }, [keys]
  );


  const generateKeys = useCallback(async () => {
    let i = 0;
    while (i < MAX_SMASH_KEYS) {
      if (!shouldGenerateSmashKeys.current) {
        console.log("Game finished, stop generating smash keys.");
        break;
      }
      const key: ArrowKeyType = MAPPING.get(Math.floor(Math.random() * 4)) || 'ArrowRight';
      addKeys(key);
      await delay(INTERNAL_MS);
      i = i+1;
    }
  }, [addKeys]
  );  

  return {
    keys,
    consumeKeys,
    generateKeys,
    shouldGenerateSmashKeys,
  };
};

export default useSmashGenerator;
