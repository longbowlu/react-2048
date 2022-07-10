import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RawSigner } from '@mysten/sui.js';

const requestCoin = (async (addr: string) => {
  try {
    const response = await fetch(process.env.URL!, {
      method: 'POST',
      mode: 'cors', 
      body: JSON.stringify({"FixedAmountRequest": {"recipient": addr}}),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
      },
    });
    return response.ok;
  } catch (error: any) {
    console.error(
      `Failed request test SUI tokens. Please try again later or report the issue.`,
    );
    return false;
  }
})  


interface IntroDialogProps {
  signer: RawSigner;
  setGameOn: (v: boolean) => void;
}

const IntroDialog: React.FC<IntroDialogProps> = ({
  signer,
  setGameOn,
}) => {
  const [open, setOpen] = React.useState(true);
  const [clicked, setClicked] = React.useState(false);
  const [content, setContent] = React.useState(
    "Join tiles to bring Sui into ocean. "+
    "Each tile merge commits a transaction and "+
    "creates an NFT on Sui blockchain. " +
    "Request some SUI coins to get started. "
  );

  const handleClick = async () => {
    const addr = await signer.getAddress();
    let success = false;
    try {
      const resp = await requestCoin(addr);
      if (resp) {
        console.info("Test SUI coins requested.");
        success = true;
        setOpen(false);
        setGameOn(true);
        setContent("Success!");
      } 
    } catch (error: any) {
      console.error(
        `Failed request test SUI tokens with errors: `,
        error.message,
      );
    }
    setClicked(true);
    if (!success) {
      setContent("Oops! Something is wrong, please report the issue and come back later.");
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Sui 2048</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={clicked} onClick={() => handleClick()}>Request Test SUI Coins</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IntroDialog;