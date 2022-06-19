import React, { FC, useCallback, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Box from '../components/Box';
import Control from '../components/Control/Control';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import SuiBoard from '../components/Sui';
import Switch from '../components/Switch';
import Text from '../components/Text';
import useGameBoard from '../hooks/useGameBoard';
import useGameScore from '../hooks/useGameScore';
import useGameState, { GameStatus } from '../hooks/useGameState';
import useScaleControl from '../hooks/useScaleControl';
import useSui from '../hooks/useSui';
import useCallMove from '../hooks/useCallMove';
// import load{} from '../hooks/useSui';
import { GRID_SIZE, MIN_SCALE, SPACING } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeName } from '../themes/types';
import useTheme from '../hooks/useTheme';
import { useAsync } from "react-async"

export type Configuration = {
  theme: ThemeName;
  bestScore: number;
  rows: number;
  cols: number;
};

const APP_NAME = 'sui-2048';

const getAddress = async ({ signer }) => {
  const address = await signer.getAddress();
  // const foo = {"recipient": address};
  // const response = await fetch("http://faucet.devnet.sui.io/gas", {
  //   method: 'POST',
  //   body: JSON.stringify({"FixedAmountRequest": foo}),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'http://localhost:3000',
  //   } });
  
  // if (response.ok) { console.log("requested tokens,"); }
  
  return address;
}

const App: FC = () => {
  const [{ status: gameStatus, pause }, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
  });

  const [{ name: themeName, value: themeValue }, setTheme] = useTheme(
    config.theme,
  );

  const [rows, setRows] = useScaleControl(config.rows);
  const [cols, setCols] = useScaleControl(config.cols);

  const { total, best, totalTxn, addScore, setTotal, incrementTotalTxnCount} = useGameScore(config.bestScore);
  const signer = useSui();
  // const {totalTxn, recordOnChain, incrementTotalTxnCount} = useCallMove(signer);
  const {recordOnChain } = useCallMove(signer);
  // const { address, signer } = useSui();
  // const baz = useAsync(useSui);
  const state = useAsync({ promiseFn: getAddress, signer: signer });
  // const baz = useAsync({ promiseFn: get_address(signer)});
  // const baz = useAsync(get_address);
  // const state = useAsync(async () => {
  //   return await signer.getAddress();
  // }, [signer]);
  // const objects = useAsync(foo);
  // console.log("@@@@@@ addr:", state);
  const address = state.isPending ? "loading" : "0x"+state.data;
  // const signer = useSui();

  const { tiles, onMove, onMovePending } = useGameBoard({
    rows,
    cols,
    pause,
    gameStatus,
    setGameStatus,
    addScore,
    signer,
    // totalTxn,
    recordOnChain,
    incrementTotalTxnCount,
  });

  const onResetGame = useCallback(() => {
    setGameStatus('restart');
  }, [setGameStatus]);

  const onCloseNotification = useCallback(
    (currentStatus: GameStatus) => {
      setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
    },
    [setGameStatus],
  );

  useEffect(() => {
    if (gameStatus === 'restart') setTotal(0);
  }, [gameStatus, setTotal]);

  useEffect(() => {
    setConfig({ rows, cols, bestScore: best, theme: themeName });
  }, [rows, cols, best, themeName, setConfig]);

  return (
    <ThemeProvider theme={themeValue}>
      <Box
        justifyContent="center"
        inlineSize="100%"
        blockSize="100%"
        alignItems="start"
        borderRadius={0}
      >
        <Box
          justifyContent="center"
          flexDirection="column"
          inlineSize={`${GRID_SIZE}px`}
        >
          <Box marginBlockStart="s6" inlineSize="100%" justifyContent="end">
            <Switch
              title="dark mode"
              checked={themeName === 'dark'}
              activeValue="dark"
              inactiveValue="default"
              onChange={setTheme}
            />
          </Box>
          <Box
            inlineSize="100%"
            justifyContent="space-between"
            marginBlockStart="s2"
          >
            <Box>
              <Text fontSize={64} fontWeight="bold" color="primary">
                2048
              </Text>
            </Box>
            <Box justifyContent="center">
              <ScoreBoard total={total} title="score" />
              <ScoreBoard total={best} title="best" />
            </Box>
          </Box>
          {/* <Box marginBlockStart="s2" marginBlockEnd="s6" inlineSize="100%">
            <Control
              rows={rows}
              cols={cols}
              onReset={onResetGame}
              onChangeRow={setRows}
              onChangeCol={setCols}
            />
          </Box> */}
          <GameBoard
            tiles={tiles}
            boardSize={GRID_SIZE}
            rows={rows}
            cols={cols}
            spacing={SPACING}
            gameStatus={gameStatus}
            onMove={onMove}
            onMovePending={onMovePending}
            onCloseNotification={onCloseNotification}
          />
          {/* <Box marginBlock="s4" justifyContent="center" flexDirection="column">
            <Text fontSize={16} as="p" color="primary">
              ✨ Join tiles with the same value to get 2048
            </Text>
            <Text fontSize={16} as="p" color="primary">
              🕹️ Play with arrow keys or swipe
            </Text>
          </Box> */}
          <Box marginBlock="s4" justifyContent="center">
            <SuiBoard total={totalTxn + " Txns"} title={address} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
