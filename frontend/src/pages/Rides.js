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
  ListItem,
  SimpleGrid,
  SlideFade,
  Spacer,
  Text,
  UnorderedList,
  useControllableState,
  VStack,
} from "@chakra-ui/react";

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
      margin="30px 35px"
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
    <Accordion allowMultiple margin="30px 0px">
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
        margin="20px 35px"
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
function Rides() {
  const rides = [
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
    sampleRideInfo,
  ];

  return (
    <Box padding="40px">
      <Flex align="center">
        <Heading as="h1" size="3xl">
          Rides
        </Heading>
        <Spacer />
        <Button margin="0px 35px" width="33%" height="50px">
          <Text fontSize="xl"> Create a New Ride</Text>
        </Button>
      </Flex>
      <Flex align="end">
        <Heading as="h2" size="md" margin="20px 0px">
          {"LAX -> UCLA on June 15, 2029"}
        </Heading>
      </Flex>
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
