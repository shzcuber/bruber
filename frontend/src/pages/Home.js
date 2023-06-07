import {
  Heading,
  Box,
  Text,
  Flex,
  useControllableState,
  Button,
  Spacer,
  Link,
  SlideFade,
} from "@chakra-ui/react";
import JourneyInputter from "../components/JourneyInputter";
import { sampleLocations } from "../utilities";

import { Link as RouterLink } from "react-router-dom";
import { getCurrentTime } from "../utilities";
import Navbar from "../components/Navbar";

import {
  createSearchParams,
  // Link,
  useNavigate,
} from "react-router-dom";

function Home() {
  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };
  const [start, setStart] = useControllableState({ defaultValue: "UCLA" });
  const [destination, setDestination] = useControllableState({
    defaultValue: "LAX",
  });
  const [time, setTime] = useControllableState({
    defaultValue: getCurrentTime(),
  });
  const journey = {
    start: start,
    destination: destination,
    time: time,
    setStart: setStart,
    setDestination: setDestination,
    setTime: setTime,
  };
  const navigate = useNavigate();
  const openRides = () => {
    navigate({
      pathname: "/rides",
      search: createSearchParams({
        start: start,
        destination: destination,
        time: time,
      }).toString(),
    });
  };

  return (
    <Box className="home-container" color="primary.700">
      <Navbar />
      <SlideFade
        in={true}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <Box mt="5%" ml="5%" className="home-heading">
          <Heading as="h1" size="4xl">
            Bruber
          </Heading>
          <Text fontSize="3xl">Ridesharing for Bruins</Text>
        </Box>

        <Box
          backgroundColor="white"
          borderRadius="30px"
          p="25px"
          mt="25px"
          mx="5%"
          boxShadow="md"
        >
          <Box p="10px">
            <Text mb="20px" fontSize="xl">
              Find other UCLA Students and Split the Cost
            </Text>
            <JourneyInputter
              locations={sampleLocations}
              journey={journey}
              onSearchClick={openRides}
            />
            <Flex mt="50px">
              <Link as={RouterLink} to="/upcoming_rides" w="45%">
                <Button w="100%">
                  <Text isTruncated>View all upcoming rides</Text>
                </Button>
              </Link>
              <Spacer />
              <Link as={RouterLink} to="/about" w="45%">
                <Button w="100%">
                  <Text isTruncated>About Bruber</Text>
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Home;

//utility
