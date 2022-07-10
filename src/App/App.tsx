import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Box from '../components/Box';
import Smash from '../components/Smash/Smash';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import IntroDialog from '../components/Intro';
import Text from '../components/Text';
import TxnTable from '../components/TxnTable';
import useGameBoard from '../hooks/useGameBoard';
import useSmash from '../hooks/useSmash';
import useSmashGenerator from '../hooks/useSmashGenerator';
import useGameScore from '../hooks/useGameScore';
import useGameState from '../hooks/useGameState';
import useScaleControl from '../hooks/useScaleControl';
import useSui, { getAddress } from '../hooks/useSui';
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

  const [{ name: themeName, value: themeValue }] = useTheme(
    config.theme,
  );

  const [rows] = useScaleControl(config.rows);
  const [cols] = useScaleControl(config.cols);

  const { total, best, txns, addScore, setTotal, appendTxn } = useGameScore(config.bestScore);
  const { signer, recordOnChain } = useSui();

  const state = useAsync({ promiseFn: getAddress, signer: signer });
  const address = state.isPending ? "loading" : "0x"+state.data;

  const { keys, consumeKeys, generateKeys, shouldGenerateSmashKeys } = useSmashGenerator();
  const { tiles, onMove, onMovePending, gameOn, setGameOn } = useGameBoard({
    rows,
    cols,
    pause,
    gameStatus,
    setGameStatus,
    addScore,
    signer,
    recordOnChain,
    appendTxn,
    shouldGenerateSmashKeys,
  });
  useSmash(onMove, gameOn, consumeKeys, keys);

  useEffect(() => {
    if (gameStatus === 'restart') setTotal(0);
  }, [gameStatus, setTotal]);

  useEffect(() => {
    setConfig({ rows, cols, bestScore: best, theme: themeName });
  }, [rows, cols, best, themeName, setConfig]);

  return (
    <ThemeProvider theme={themeValue}>
      <IntroDialog signer={signer} setGameOn={setGameOn}></IntroDialog>
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
          <Box marginBlockStart="s2" marginBlockEnd="s6" inlineSize="100%">
            <Smash onClick={generateKeys} />
          </Box>
          <GameBoard
            tiles={tiles}
            boardSize={GRID_SIZE}
            rows={rows}
            cols={cols}
            spacing={SPACING}
            gameStatus={gameStatus}
            onMove={onMove}
            onMovePending={onMovePending}
            // onCloseNotification={onCloseNotification}
            gameOn={gameOn}
            txns={txns}
          />
          {/* <Box marginBlock="s4" justifyContent="center" flexDirection="column">
            <Text fontSize={16} as="p" color="primary">
              💦 Join tiles to bring Sui into ocean.
            </Text>
            <Text fontSize={16} as="p" color="primary">
              🌊 Each tile merge commits a transaction
            </Text>
            <Text fontSize={16} as="p" color="primary">
              🌊 and creates an NFT on Sui blockchain.
            </Text>
          </Box> */}
          <Box marginBlock="s4" justifyContent="center">
            <TxnTable address={address} rows={txns}/>
          </Box>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
