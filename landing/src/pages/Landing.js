import {
  Button,
  Box,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {

  const handleClick = () => {
    window.location.href = 'https://bruber-ur7f-git-main-shzcuber.vercel.app/';
  };


  return (
    <Box width="100hh" height="100vh" className="landing-background">
      <Container maxW="container.xxl">
        <Center p={4} minHeight="70vh">
          <VStack>
            <Container maxW="container.lg" textAlign="center">
              <Heading size="4xl" mb={4} color="primary.500">
                Connect. Commute. Bruber.
              </Heading>

              <Text fontSize="4xl" color="primary.700">
                Find fellow Bruins who share your trip
              </Text>

              <Button  onClick={handleClick} mt={8} colorScheme="secondary" minW="300px">
                Start your journey →
              </Button>
            </Container>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
}
