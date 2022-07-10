import { useCallback, useEffect } from 'react';
import { DIRECTION_MAP } from '../utils/constants';
import { ArrowKeyType, Vector } from '../utils/types';


const useSmash = (cb: (dir: Vector) => void, gameOn: boolean, consumeKeys: () => ArrowKeyType | undefined, keys: ArrowKeyType[]) => {
  const onKeyDown = useCallback(
    (smashKey: ArrowKeyType) => {
      cb(DIRECTION_MAP[smashKey]);
    },
    [cb],
  );
  useEffect(() => {
    const key = consumeKeys();
    if (key === undefined) {
      return;
    }
    onKeyDown(key);

  }, [onKeyDown, gameOn, keys, consumeKeys]);
};

export default useSmash;
