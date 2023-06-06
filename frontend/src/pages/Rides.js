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

import RideCardGrid from "../components/RideCardGrid";

import JourneyInputter from "../components/JourneyInputter";

import RideSignupButton from "../components/RideSignupButton";

import {
  AiOutlineSwap,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import RideCard from "../components/RideCard";

import { passengersToList } from "../utilities";
import { parseTime } from "../utilities";
import "./Rides.css";

const sampleRideInfo = {
  driverName: "Joe Biden",
  startTime: "2023-06-03T13:30",
  capacity: 4,
  passengers: ["Barack Obama", "Donald Trump", "Drake"],
};

const sampleLocations = ["LAX", "UCSD", "UCI", "UCR", "UCB", "UCSB", "UCLA"];

function RideCardAccordion(props) {
  const rideAccordionItems = props.rides.map((ride, index) => (
    <AccordionItem
      key={index}
      background="white"
      color="primary.500"
      borderColor="primary.500"
    >
      <AccordionButton
        display="block"
        _expanded={{ bg: "primary.500", color: "white" }}
      >
        <Flex align="center">
          <Flex gap="4" align="center">
            <Avatar name={ride.driverFirstName + " " + ride.driverLastName} />
            <Box textAlign="left">
              <Text as="b" fontSize="xl">
                {ride.driverFirstName + " " + ride.driverLastName}
              </Text>
              <Text fontSize="xl">Driver</Text>
            </Box>
          </Flex>
          <Spacer />
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel
        padding="0px"
        background="primary.150"
        color="primary.500"
      >
        <Box margin="15px">
          <Text p="10px" fontWeight="bold" fontSize="xl">
            {parseTime(ride.startTime)}
          </Text>
          <Text p="10px" fontWeight="bold" fontSize="xl">
            From: {ride.from}
          </Text>
          <Text p="10px" fontWeight="bold" fontSize="xl">
            To: {ride.to}
          </Text>
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
          <Box margin="25px 15px">
            <RideSignupButton rideId={ride.id} />
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Accordion allowMultiple margin="20px 0px">
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
  const [rides, setRides] = useState([]);

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
    fetch("http://localhost:3000/get_rides", requestOptions)
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        console.log("data: ", data);
        console.log("Data received: " + JSON.stringify(data));
        setRides(data);
      })
      .catch((error) => console.log("Error: " + error));
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
          {start + " to " + destination + ", departing on " + parseTime(time)}
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
