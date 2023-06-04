import {
  Heading,
  Box,
  Text,
  Flex,
  useControllableState,
  Button,
  Spacer,
} from "@chakra-ui/react";
import JourneyInputter from "../components/JourneyInputter";

import { createSearchParams, Link, useNavigate } from "react-router-dom";

function Home() {
  const [start, setStart] = useControllableState({ defaultValue: "UCLA" });
  const sampleLocations = ["LAX", "UCSD", "UCI", "UCR", "UCB", "UCSB", "UCLA"];
  const [destination, setDestination] = useControllableState({
    defaultValue: "LAX",
  });
  const [time, setTime] = useControllableState({ defaultValue: "00" });
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
    <Box className="home-container">
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
            <Link to="/rides">
              <Button w="100%">
                <Text isTruncated>View all upcoming rides</Text>
              </Button>
            </Link>
            <Spacer />
            <Button w="45%">About Bruber</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
