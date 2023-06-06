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
export default function Landing() {
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

              <Button mt={8} colorScheme="secondary" minW="300px">
                Start your journey →
              </Button>
            </Container>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
}
