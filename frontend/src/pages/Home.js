import './Home.css';
import {
  Heading,
  Box,
  Text,
  FormControl,
} from "@chakra-ui/react";

function Home() {
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
          <FormControl>
          </FormControl>
        </Box>
    </Box>
  );
}

export default Home;
