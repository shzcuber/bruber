import { AiOutlineSwap, AiOutlineSearch } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function JourneyInputter(props) {
  /////Component for inputting start and destination/////
  const optionList = props.locations.map((location, index) => (
    <option value={location} key={index}>
      {location}
    </option>
  ));

  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      align="center"
      spacing={6}
    >
      <Flex
        align="center"
        width={isSmallScreen ? "100%" : "25%"}
        backgroundColor="gray.100"
        paddingLeft="10px"
        borderRadius="7px"
      >
        <Icon as={FiMapPin} boxSize={6} />
        <Select
          onChange={(event) =>
            props.journey.setStart(event.currentTarget.value)
          }
          variant="unstyled"
          value={props.journey.start}
          marginLeft="20px"
          height="40px"
        >
          {optionList}
        </Select>
      </Flex>
      <IconButton
        icon={<AiOutlineSwap />}
        margin={isSmallScreen ? "10px auto" : "25px"}
        onClick={() => {
          props.journey.setDestination(props.journey.start);
          props.journey.setStart(props.journey.destination);
        }}
      />
      <Flex
        align="center"
        width={isSmallScreen ? "100%" : "25%"}
        height="40px"
        backgroundColor="gray.100"
        paddingLeft="10px"
        borderRadius="7px"
      >
        <Icon as={FiMapPin} boxSize={6} />
        <Select
          onChange={(event) =>
            props.journey.setDestination(event.currentTarget.value)
          }
          variant="unstyled"
          marginLeft="20px"
          value={props.journey.destination}
          height="40px"
        >
          {optionList}
        </Select>
      </Flex>
      <Flex
        align="center"
        width={isSmallScreen ? "100%" : "25%"}
        height="40px"
        backgroundColor="gray.100"
        padding="10px"
        borderRadius="7px"
      >
        <Input
          type="datetime-local"
          backgroundColor="gray.100"
          variant="unstyled"
          height="40px"
          onChange={(event) => props.journey.setTime(event.currentTarget.value)}
        />
      </Flex>
      <Button
        width={isSmallScreen ? "100%" : "20%"}
        colorScheme="secondary"
        rightIcon={<AiOutlineSearch />}
        onClick={props.onSearchClick}
      >
        Search
      </Button>
    </Stack>
  );
}
