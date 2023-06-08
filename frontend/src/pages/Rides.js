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
import Navbar from "../components/Navbar";
import RideCardAccordion from "../components/RideCardAccordian";
import RidesDisplay from "./RidesDisplay";
import { getCurrentTime } from "../utilities";

import { getAuth } from "firebase/auth";

import {
  AiOutlineSwap,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

function Rides(props) {
  const [rides, setRides] = useState([]);
  console.log(rides);
  const [searchParams] = useSearchParams();
  const [start, setStart] = useControllableState({
    defaultValue: searchParams.get("start")
      ? searchParams.get("start")
      : "UCLA",
  });
  const [destination, setDestination] = useControllableState({
    defaultValue: searchParams.get("destination")
      ? searchParams.get("destination")
      : "LAX",
  });
  const [time, setTime] = useControllableState({
    defaultValue: searchParams.get("time")
      ? searchParams.get("time")
      : getCurrentTime().substring(0, 10),
  });
  const [alertTime, setAlertTime] = useState(false);
  const [rideStatus, setRideStatus] = useState("");

  useEffect(() => {
    if (searchParams) {
      getRides();
    }
  }, [searchParams]);
  //const [rides, setRides] = useControllableState({ defaultValue: [] });

  const journey = {
    start: start,
    destination: destination,
    time: time,
    setStart: setStart,
    setDestination: setDestination,
    setTime: setTime,
  };

  function getRides(e) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const data = {
      to: journey.destination,
      from: journey.start,
      startTime: journey.time,
    };

    const searchParameters = new URLSearchParams(data).toString();

    fetch(
      `${process.env.REACT_APP_BACKEND}/get_rides?${searchParameters}`,
      requestOptions
    )
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        setRides(data);
        setAlertTime(true);
        if (data.length == 0 && alertTime == true) {
          setRideStatus("No Rides Found!");
        } else {
          setRideStatus("");
        }
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

  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };

  return (
    <Box>
      <Navbar authUser={props.authUser} />
      <SlideFade
        in={true}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <Box
          mx="5%"
          my="40px"
          backgroundColor="primary.150"
          color="primary.700"
        >
          <Flex align="center">
            <Heading as="h1" size="3xl">
              Rides
            </Heading>
            <Spacer />
            <Box height="50px" width="33%">
              <Link to="/create_ride">
                <Button width="100%">
                  <Text isTruncated fontSize="xl">
                    {" "}
                    Create a New Ride
                  </Text>
                </Button>
              </Link>
            </Box>
          </Flex>
          <Flex align="end">
            <Heading as="h2" size="md" margin="20px 0px">
              {start +
                " to " +
                destination +
                ", departing on " +
                new Date(time).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
            </Heading>
          </Flex>
          <Box marginBottom="20px">
            <JourneyInputter
              locations={sampleLocations}
              journey={journey}
              onSearchClick={getRides}
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
            boxShadow="md"
          >
            <RidesDisplay authUser={props.authUser} rides={rides} />
            <p>{rideStatus}</p>
          </Box>
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Rides;
