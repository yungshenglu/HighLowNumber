import React from "react";
import PropTypes from "prop-types";
import { Flex, Center, Heading, Button } from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { HIGHER, LOWER } from "../constants/Guess";

interface ICardProps {
  content: string;
  contentColor: string;
  showButtons: boolean;
  isGuessed: boolean;
  onClickGuess: Function;
}

const Card = (props: ICardProps) => {
  const { content, contentColor, showButtons, isGuessed, onClickGuess } = props;

  const handleClick = (guess: string) => () => {
    onClickGuess(guess);
  };

  return (
    <Flex maxW="120px" flex={1} direction="column">
      <Center
        w="full"
        minH="120px"
        maxH="120px"
        px="24px"
        py="16px"
        bgColor="white"
        borderRadius="md"
        boxShadow="lg"
        flex={1}
      >
        <Heading fontSize="54px" color={contentColor}>
          {showButtons && !isGuessed ? "?" : content}
        </Heading>
      </Center>

      {showButtons && !isGuessed && (
        <>
          <Button
            mt="32px"
            colorScheme="twitter"
            leftIcon={<RiArrowUpSLine />}
            isFullWidth
            onClick={handleClick(HIGHER)}
          >
            {HIGHER}
          </Button>
          <Button
            mt="8px"
            colorScheme="facebook"
            leftIcon={<RiArrowDownSLine />}
            isFullWidth
            onClick={handleClick(LOWER)}
          >
            {LOWER}
          </Button>
        </>
      )}
    </Flex>
  );
};

Card.propTypes = {
  content: PropTypes.string,
  contentColor: PropTypes.string,
  showButtons: PropTypes.bool,
  isGuessed: PropTypes.bool,
  onClickGuess: PropTypes.func
};

Card.defaultProps = {
  content: "?",
  contentColor: "",
  showButtons: false,
  isGuessed: false,
  onClickGuess: () => {}
};

export default Card;
