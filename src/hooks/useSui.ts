import { useState, useCallback } from 'react';
import { Ed25519Keypair, JsonRpcProvider, RawSigner, getTransactionEffectsResponse } from '@mysten/sui.js';
import {
  PriorityQueue,
  ICompare,
} from '@datastructures-js/priority-queue';
import {TILE_MAPPING} from '../utils/constants'

interface TileOnChainPrepInfo {
  newTileValue: string;
  gasObjID: string;
}

interface GasObjUsage {
  gasObjID: string;
  usedTimes: number;
}

export const getAddress = async ({signer}) => {
  const address = await signer.getAddress();
  return address;
}

const getTileValue = (num: number) => TILE_MAPPING.get(num)!;

const compareGasObjUsage: ICompare<GasObjUsage> = (a: GasObjUsage, b: GasObjUsage) => {
  return a.usedTimes - b.usedTimes;
};

const useSui = () => {
  const [signer] = useState(new RawSigner(
    new Ed25519Keypair(),
    new JsonRpcProvider('https://gateway.devnet.sui.io:443')
  ));

  const [gasObjHeatmap, setGasObjHeatmap] = useState(new Map());

  const recordOnChain = useCallback(async (mergeInfo: number[]) => {
    const addr = await signer.getAddress();
    const provider = signer.provider;
    let objects = await provider.getObjectsOwnedByAddress(addr);

    objects = objects.filter(object => object.type == "0x2::coin::Coin<0x2::sui::SUI>");
    if (objects.length < 1) {
      throw Error("Address " + addr + " does not have any SUI coins. Request by clicking the button.");
    }
    const objectIds = new PriorityQueue<GasObjUsage>(compareGasObjUsage);
    objects.forEach(function (obj) {
      objectIds.enqueue({gasObjID: obj.objectId, usedTimes: gasObjHeatmap.get(obj.objectId) || 0});
    });

    const InfoAndGas: TileOnChainPrepInfo[] = [];
    mergeInfo.forEach((value, idx) => {
      const g = objectIds.dequeue();
      InfoAndGas.push({newTileValue: getTileValue(value), gasObjID: g.gasObjID});
      objectIds.enqueue({gasObjID: g.gasObjID, usedTimes: g.usedTimes+1});
    });
    const objectIdArray = objectIds.toArray();

    objectIdArray.forEach(function (obj) {
      setGasObjHeatmap( m => m.set(obj.gasObjID, obj.usedTimes));
    });    

    const txns = await Promise.all(
      InfoAndGas.map(async (data: TileOnChainPrepInfo) => {
        const transferTxn = await signer.executeMoveCall({
          packageObjectId: '0x2',
          module: 'devnet_nft',
          function: 'mint',
          typeArguments: [],
          arguments: ["My Gallery",
          "My Gallery",
          "https://cointelegraph.com/magazine/wp-content/uploads/2021/03/magazine_Pepe.jpg"],
          gasPayment: data.gasObjID,
          gasBudget: 3000,
        }); 
        const effectResponse = getTransactionEffectsResponse(transferTxn)!;
        return effectResponse.certificate.transactionDigest;
      })
    );

    return txns;
  }, [signer, gasObjHeatmap])
  
  return {signer, recordOnChain};
}

export default useSui;
