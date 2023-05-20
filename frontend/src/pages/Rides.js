import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  ListItem,
  Select,
  SimpleGrid,
  SlideFade,
  Spacer,
  Text,
  UnorderedList,
  useControllableState,
  VStack,
} from "@chakra-ui/react";

import { AiOutlineSwap } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const sampleRideInfo = {
  driver: {
    name: "Joe Biden",
    avatarSrc: "../../public/logo512.png",
    rating: 4.5,
  },
  time: {
    start: 930,
    end: 1030,
  },
  capacity: 4,
  passengers: ["Barack Obama", "Donald Trump", "Drake"],
};

const sampleLocations = ["LAX", "UCSD", "UCI", "UCR", "UCB", "UCSB", "UCLA"];

function RideCard(props) {
  /* props will have:
   * a driver,
   * a time,
   * a list of names that are part of the carpool group,
   * a carpool capacity (will fill any vacancies with "empty")
   */
  console.log(props);
  const peopleList = passengersToList(props.names, props.capacity);
  return (
    <Card padding="30px">
      <CardHeader height="70px">
        <Flex gap="4" align="center">
          <Avatar name={props.driver} />
          <Box>
            <Text as="b" fontSize="xl">
              {props.driver}
            </Text>
            <Text fontSize="xl">Driver</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="left">
          <Text as="b" fontSize="3xl">
            {props.time}
          </Text>
          <UnorderedList paddingLeft="25px" height="150px" overflow="hidden">
            {peopleList}
          </UnorderedList>
          <Text as="b" fontSize="2xl">
            {props.capacity -
              props.names.length +
              "/" +
              props.capacity +
              " Spots Available"}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
function RideCardGrid(props) {
  const rideCardList = props.rides.map((ride, index) => (
    <RideCard
      key={index}
      driver={ride.driver.name}
      time={ride.time.start}
      capacity={ride.capacity}
      names={ride.passengers}
    />
  ));
  return (
    <SimpleGrid
      minChildWidth="350px"
      spacingX="40px"
      spacingY="20px"
      margin="10px 35px"
    >
      {rideCardList}
    </SimpleGrid>
  );
}
function RideCardAccordion(props) {
  const rideAccordionItems = props.rides.map((ride, index) => (
    <AccordionItem key={index}>
      <AccordionButton display="block">
        <Flex align="center">
          <Flex gap="4" align="center">
            <Avatar name={ride.driver.name} />
            <Box textAlign="left">
              <Text as="b" fontSize="xl">
                {ride.driver.name}
              </Text>
              <Text fontSize="xl">Driver</Text>
            </Box>
          </Flex>
          <Spacer />
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        <UnorderedList paddingLeft="25px" height="150px" overflow="hidden">
          {passengersToList(ride.passengers, ride.capacity)}
        </UnorderedList>
        <Text as="b" fontSize="2xl">
          {ride.capacity -
            ride.passengers.length +
            "/" +
            ride.capacity +
            " Spots Available"}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Accordion allowMultiple margin="10px 0px">
      {rideAccordionItems}
    </Accordion>
  );
}
function RidesDisplay(props) {
  const [viewAccordion, setViewAccordion] = useControllableState({
    defaultValue: true,
  });
  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };

  return (
    <Box>
      <Button
        margin="2px 20px"
        width="10%"
        height="25px"
        onClick={() => {
          console.log("clicked!");
          setViewAccordion(!viewAccordion);
        }}
      >
        Change view
      </Button>
      <SlideFade
        in={viewAccordion}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <RideCardAccordion rides={props.rides} />
      </SlideFade>
      <SlideFade
        in={!viewAccordion}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <RideCardGrid rides={props.rides} />
      </SlideFade>
    </Box>
  );
}
function JourneyInputter(props) {
  /////Component for inputting start and destination/////
  const optionList = props.locations.map((location, index) => (
    <option value={location} key={index}>
      {location}
    </option>
  ));
  return (
    <Flex align="center">
      <Flex
        align="center"
        width="33%"
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
        icon={<Icon as={AiOutlineSwap} />}
        margin="25px"
        onClick={() => {
          props.journey.setDestination(props.journey.start);
          props.journey.setStart(props.journey.destination);
        }}
      />
      <Flex
        align="center"
        width="33%"
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
    </Flex>
  );
}

function Rides() {
  const rides = [
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
  ];

  const [start, setStart] = useControllableState({ defaultValue: "UCLA" });
  const [destination, setDestination] = useControllableState({
    defaultValue: "LAX",
  });

  const journey = {
    start: start,
    destination: destination,
    setStart: setStart,
    setDestination: setDestination,
  };
  return (
    <Box padding="40px">
      <Flex align="center">
        <Heading as="h1" size="3xl">
          Rides
        </Heading>
        <Spacer />
        <Box margin="0px 35px" height="50px" width="33%">
          <Link to="/create_ride">
            <Button width="100%">
              <Text fontSize="xl"> Create a New Ride</Text>
            </Button>
          </Link>
        </Box>
      </Flex>
      <Flex align="end">
        <Heading as="h2" size="md" margin="20px 0px">
          {start + " to " + destination + " on June 15, 2029"}
        </Heading>
      </Flex>
      <JourneyInputter locations={sampleLocations} journey={journey} />
      <RidesDisplay rides={rides} />
    </Box>
  );
}

export default Rides;

//utility
function passengersToList(passengers, capacity) {
  let emptyList = Array(capacity - passengers.length).fill("Empty");
  const peopleList = [...passengers, ...emptyList].map((name, index) => {
    return (
      <ListItem key={index} paddingLeft="15px">
        <Text fontSize="2xl">{name}</Text>
      </ListItem>
    );
  });
  return peopleList;
}
