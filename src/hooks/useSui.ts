import {
  useState,
} from 'react';

import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';


export type SuiParams = {
  address: string;
  signer: RawSigner;
  // pause: boolean;
  // gameStatus: GameStatus;
  // setGameStatus: (nextStatus: GameStatus) => void;
  // addScore: (score: number) => void;
};

const useSui = () => {
  // get_signer().then({address, signer} => {address, signer});
  // let thenProm = resolvedProm.then(value => {
  //     console.log("this gets called after the end of the main stack. the value received and returned is: " + value);
  //     return value;
  // });
  // const params = get_signer().then( value => {
  //   return {value.address, value.signer}
  // });
  // return {
  //   address,
  //   signer
  // };
  // console.log("@@@@@@@@ call use sui");
  // WTF is useState?
  const [signerState, setSignerState] = useState(new RawSigner(
    new Ed25519Keypair(),
    new JsonRpcProvider('https://gateway.devnet.sui.io:443')
  ));
  // const [signer_state, _] = useState(signer);
  return signerState;
}

// async function bar(signer: RawSigner) {
//   // Generate a new Keypair
//   // const keypair = new Ed25519Keypair();
//   // const signer = new RawSigner(
//   //   keypair,
//   //   new JsonRpcProvider('https://gateway.devnet.sui.io:443')
//   // );
//   const addr = await signer.getAddress();
//   console.log('addr:', addr);
//   const transferTxn = await signer.executeMoveCall({
//     packageObjectId: '0x2',
//     module: 'DevNetNFT',
//     function: 'mint',
//     typeArguments: [],
//     arguments: ["My Gallery",
//     "My Gallery",
//     "https://cointelegraph.com/magazine/wp-content/uploads/2021/03/magazine_Pepe.jpg"],
//     gasBudget: 3000,
//     // recipient: '0xd84058cb73bdeabe123b56632713dcd65e1a6c92',
//   });
//   console.log('transferTxn', transferTxn);
// }

export default useSui;
