import './Home.css';
import {
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  useControllableState,
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
    <Box mt="100px" ml="150px" className='home-container'>
        <div className="home-heading">
            <Heading as="h1" size="4xl">
              Bruber
            </Heading>
            <Text>Ridesharing for Bruins</Text>
        </div>

        <Box>
          Find other UCLA Students and Split the Cost
          <JourneyInputter locations={sampleLocations} journey={journey} />
        </Box>
    </Box>
  );
}

export default Home;
