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

/*
## 需求:
  - 完成比大小遊戲
    - 遊戲流程
      1. 按下 `Start Game` 按鈕會開始遊戲，`Start Game` 按鈕隨即消失
      2. 左邊的卡片中的 `?` 會變成亂數產生的數字 A
      3. 右邊的卡片下方會出現 `Higher` 和 `Lower` 的按鈕，讓 user 擇一點選
      4. 當 user 點選 `Higher` 和 `Lower` 其中一個按鈕後，兩個按鈕隨即消失
      5. 右邊的卡片中的 `?` 會變成亂數產生的數字 B
      6. 比較兩邊的數字大小，然後根據 user 的選擇，顯示遊戲結果在卡片下方，並出現 `Play Again` 按鈕
      7. 當 user 按下 `Play Again` 按鈕後，右邊的卡片中的數字 B 會變回 `?`
      8. 左邊的數字 A 會重新亂數產生，並回到上方第三步，繼續新的一場遊戲
    - 遊戲規則
      - 兩邊的數字都是隨機產生 1~10 之間的數字
      - 當 B > A 時，且 user 選擇 `Higher`，則遊戲結果為 WIN
      - 當 B > A 時，且 user 選擇 `Lower`，則遊戲結果為 LOSE
      - 當 B < A 時，且 user 選擇 `Higher`，則遊戲結果為 LOSE
      - 當 B < A 時，且 user 選擇 `Lower`，則遊戲結果為 WIN
      - 當 B = A 時，且 user 選擇 `Higher`，則遊戲結果為 LOSE
      - 當 B = A 時，且 user 選擇 `Lower`，則遊戲結果為 LOSE
## 加分項目:
  - 重構 components
  - 使用 XState 完成遊戲的狀態切換及邏輯
    - 文件：https://xstate.js.org/docs/

----------------
## Requirements:
  - Complete the High-Low Game
    - Game flow
      1. Start a new game by pressing "Start Game" button, and then hide the button
      2. The "?" in the left card will become a randomly generated number A
      3. Two buttons: "Higher" and "Lower" will show underneath the right card for user to choose upon
      4. After user clicked the “Higher” or “Lower” button, the two buttons will disappear
      5. The "?" in the right card will become a randomly generated number B
      6. Show the game result and “Play Again” button under the cards after comparing the high or low of the two numbers (A & B) and user’s choice
      7. After user clicked the “Play Again” button, the number B in the right card will change back to "?"
      8. Number A in the left card will be regenerated, return to step 3 to continue a new game
    - Game rule
      - The number A and B are always randomly generated between 1~10
      - When B > A and user chose `Higher`，the game result is WIN
      - When B > A and user chose `Lower`，the game result is LOSE
      - When B < A and user chose `Higher`，the game result is LOSE
      - When B < A and user chose `Lower`，the game result is WIN
      - When B = A and user chose `Higher`，the game result is LOSE
      - When B = A and user chose `Lower`，the game result is LOSE

## Bonus:
  - Please refactor the components
  - Complete the game with XState
    - document：https://xstate.js.org/docs/
*/
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
