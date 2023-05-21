import {
  Heading,
  Box,
  Text,
  Flex,
  useControllableState,
  Button,
  Spacer,
} from "@chakra-ui/react";
import JourneyInputter from '../components/JourneyInputter';


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

  return (
    <Box className='home-container'>
        <Box mt="100px" ml="150px" className="home-heading">
            <Heading as="h1" size="4xl">
              Bruber
            </Heading>
            <Text fontSize="3xl">Ridesharing for Bruins</Text>
        </Box>

        <Box backgroundColor="white" borderRadius="30px" p="25px" mt="25px" mx="150px">
          <Box p="10px">
            <Text mb="20px" fontSize='xl'>
              Find other UCLA Students and Split the Cost
            </Text>
            <JourneyInputter locations={sampleLocations} journey={journey} />
            <Flex>
              <Button w="45%" mt="15px">View all upcoming rides</Button>
              <Spacer />
              <Button w="45%" mt="15px">About Bruber</Button>
            </Flex>
          </Box>
        </Box>
    </Box>
  );
}

export default Home;
