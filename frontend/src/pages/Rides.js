import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
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

import JourneyInputter from "../components/JourneyInputter";

import {
  AiOutlineSwap,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";

const sampleRideInfo = {
  driverName: "Joe Biden",
  startTime: "2023-06-03T13:30",
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
    <Card variant="rideCard">
      <CardHeader>
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
      driver={ride.driverName}
      time={ride.startTime}
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
    <AccordionItem
      key={index}
      borderRadius="7px"
      background="primary.500"
      color="text.onPrimary"
    >
      <AccordionButton display="block">
        <Flex align="center">
          <Flex gap="4" align="center">
            <Avatar name={ride.driverName} />
            <Box textAlign="left">
              <Text as="b" fontSize="xl">
                {ride.driverName}
              </Text>
              <Text fontSize="xl">Driver</Text>
            </Box>
          </Flex>
          <Spacer />
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel background="primary.150" color="primary.500">
        <UnorderedList paddingLeft="25px" height="150px" overflow="hidden">
          {passengersToList(ride.passengers, ride.capacity)}
        </UnorderedList>
        <Text as="b" fontSize="2xl" paddingLeft="15px">
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
      <ButtonGroup isAttached>
        <IconButton
          icon={<AiOutlineUnorderedList />}
          onClick={() => setViewAccordion(true)}
          backgroundColor={viewAccordion ? "primary.600" : "primary.500"}
        />
        <IconButton
          icon={<BsGrid />}
          onClick={() => setViewAccordion(false)}
          backgroundColor={!viewAccordion ? "primary.600" : "primary.500"}
        />
      </ButtonGroup>
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

  const [searchParams] = useSearchParams();
  const [start, setStart] = useControllableState({
    defaultValue: searchParams.get("start"),
  });
  const [destination, setDestination] = useControllableState({
    defaultValue: searchParams.get("destination"),
  });
  const [time, setTime] = useControllableState({
    defaultValue: searchParams.get("time"),
  });
  //const [rides, setRides] = useControllableState({ defaultValue: [] });

  const journey = {
    start: start,
    destination: destination,
    time: time,
    setStart: setStart,
    setDestination: setDestination,
    setTime: setTime,
  };

  function handleSearchClick() {
    console.log("Search Button Clicked");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    // fetch("http://localhost:3000/create_ride", requestOptions)
    // .then(res => res.json()) // Convert json to js object
    // .then(data => {
    //   console.log("Data received: " + data.status);
    //   if (data === "Success")
    //     // Display success msg (chang state)

    //     setSubmitted("success");
    //     console.log(submitted);
    // })
    // .catch(error => console.log("Error: " + error))
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the form data
    // console.log('Name:', name);
    // console.log('Email:', email);
    // You can perform further actions with the form data here
  };

  return (
    <Box padding="40px" backgroundColor="primary.150" color="primary.500">
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
          {start + " to " + destination + ", departing on " + time}
        </Heading>
      </Flex>
      <Box marginBottom="20px">
        <JourneyInputter
          locations={sampleLocations}
          journey={journey}

          onSearchClick={handleSearchClick}
        />
      </Box>
      <Divider
        borderStyle="solid"
        borderWidth="1px"
        borderColor="secondary.500"
      />
      <Box
        margin="30px 0px"
        backgroundColor="primary.100"
        padding="20px"
        borderRadius="20px"
      >
        <RidesDisplay rides={rides} />
      </Box>
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

function parseTime(time) {
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const timeArray = time.split("-");
  const dayTime = timeArray[2].split("T");
  const day = dayTime[0];
  const timeOfDay = dayTime[1];
  const hourMinutes = timeOfDay.split(":");
  let hour = parseInt(hourMinutes[0]);
  const minutes = hourMinutes[1];
  let half = "AM"; //AM or PM
  if (hour > 12) {
    hour -= 12;
    half = "PM";
  }
  if (hour === 0) hour = 12;
  return (
    monthNames[parseInt(timeArray[1])] +
    " " +
    day +
    ", " +
    timeArray[0] +
    " at " +
    hour +
    ":" +
    minutes +
    " " +
    half
  );
}
