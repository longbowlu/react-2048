import { RawSigner } from '@mysten/sui.js';
import { useState, useCallback } from 'react';

const useCallMove = (signer: RawSigner) => {
  // const [totalTxn, setTotalTxn] = useState(0);

  const recordOnChain = useCallback(async () => {
    const addr = await signer.getAddress();
    console.log('addr:', addr);
    const transferTxn = await signer.executeMoveCall({
      packageObjectId: '0x2',
      module: 'DevNetNFT',
      function: 'mint',
      typeArguments: [],
      arguments: ["My Gallery",
      "My Gallery",
      "https://cointelegraph.com/magazine/wp-content/uploads/2021/03/magazine_Pepe.jpg"],
      gasBudget: 3000,
    });
    // console.log('before total:', totalTxn);
    // // setTotalTxn(totalTxn + 1);
    // console.log('after total:', totalTxn);
    console.log('transferTxn', transferTxn);
    return {};
  // }, [signer, totalTxn])
  }, [signer])

  // const incrementTotalTxnCount = useCallback((new_count: number) => {
  //   console.log('before total:', totalTxn);
  //   setTotalTxn(new_count);
  //   console.log('after total:', totalTxn);
  //   return {};
  // }, [totalTxn])
  // }, [signer])


  // const incrementTotalTxnCount = useCallback((diff: number) =>
  //   setTotalTxn((t) => t + diff), []);

  // return {totalTxn, recordOnChain, incrementTotalTxnCount};
  return {recordOnChain};

  // const addr = await signer.getAddress();
  // console.log('addr:', addr);
  // const transferTxn = await signer.executeMoveCall({
  //   packageObjectId: '0x2',
  //   module: 'DevNetNFT',
  //   function: 'mint',
  //   typeArguments: [],
  //   arguments: ["My Gallery",
  //   "My Gallery",
  //   "https://cointelegraph.com/magazine/wp-content/uploads/2021/03/magazine_Pepe.jpg"],
  //   gasBudget: 3000,
  // });
  // // setTotal(total+1);
  // console.log('total', totalTxn);
  // console.log('transferTxn', transferTxn);
}



export default useCallMove;
