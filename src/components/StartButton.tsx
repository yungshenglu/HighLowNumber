import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@chakra-ui/react";

interface IStartButton {
  isStart: boolean;
  onClickStart: () => void;
}

const StartButton = (props: IStartButton) => {
  const { isStart, onClickStart } = props;

  const [buttonText, setButtonText] = useState("Start Game");

  useEffect(() => {
    if (isStart) {
      setButtonText("Play Again");
    }
  }, [isStart]);

  return (
    <Box mt="64px">
      <Button colorScheme="blue" onClick={onClickStart}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default StartButton;
