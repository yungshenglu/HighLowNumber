import React, { useState } from "react";
import { Box, Flex, Center, Heading, Stack } from "@chakra-ui/react";
import Card from "./components/Card";
import StartButton from "./components/StartButton";
import {
  HIGHER,
  LOWER,
  WIN,
  LOSS,
  WIN_LOSS_COLOR,
  GAME_STATE_START,
  GAME_STATE_GAMING,
  GAME_STATE_RESTART
} from "./constants/Guess";

const App = () => {
  const [leftNumber, setLeftNumber] = useState("?");
  const [rightNumber, setRightNumber] = useState("?");
  const [gameState, setGameState] = useState(GAME_STATE_START);
  const [result, setResult] = useState("");

  const handleRestart = () => {
    setLeftNumber(String(Math.round(Math.random() * 100)));
    setRightNumber(String(Math.round(Math.random() * 100)));
    setGameState(GAME_STATE_GAMING);
  };

  const handleStart = () => {
    handleRestart();
  };

  const handleGuess = (guess: string) => {
    if (
      (guess === HIGHER && rightNumber > leftNumber) ||
      (guess === LOWER && rightNumber < leftNumber)
    ) {
      setResult(WIN);
    } else {
      setResult(LOSS);
    }
    setGameState(GAME_STATE_RESTART);
  };

  return (
    <Box bgColor="#f3f3f3" h="100vh">
      <Center pt="120px">
        <Flex w="400px" px="64px" direction="column" align="center">
          <Flex mb="64px">
            <Heading mr="16px" fontSize="36px" color="twitter.500">
              High
            </Heading>
            <Heading fontSize="36px" color="facebook.500">
              Low
            </Heading>
          </Flex>
          <Flex w="full" justify="space-between">
            <Card
              content={leftNumber}
              contentColor="grey.500"
              onClickGuess={handleGuess}
            />
            <Card
              content={rightNumber}
              contentColor="blue.500"
              showButtons={gameState === GAME_STATE_GAMING}
              isGuessed={gameState === GAME_STATE_RESTART}
              onClickGuess={handleGuess}
            />
          </Flex>

          {gameState === GAME_STATE_START && (
            <StartButton
              isStart={gameState !== GAME_STATE_START}
              onClickStart={handleStart}
            />
          )}

          {/* Game result UI */}
          {gameState === GAME_STATE_RESTART && (
            <Stack mt="24px" spacing="16px">
              <Heading color={WIN_LOSS_COLOR[result]} align="center">
                {result}
              </Heading>
              <StartButton isStart onClickStart={handleRestart} />
            </Stack>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
