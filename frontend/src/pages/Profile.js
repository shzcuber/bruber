import { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Center,
  FormControl,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Stack,
  SlideFade,
} from "@chakra-ui/react";
import RideCardGrid from "../components/RideCardGrid";
import Navbar from "../components/Navbar";
import { getStarString } from "../utilities";


function Profile(props) {
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${process.env.REACT_APP_BACKEND}/user/${props.authUser.uid}`, requestOptions)
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setName(data.firstName);
        setRides(data.rides);
        setRating(data.rating ? getStarString(data.rating) : "unrated");
      })
      .catch((error) => console.log("Error: " + error));
  }, []);

  const [name, setName] = useState();
  const [rides, setRides] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("(unrated)");
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const handlePhoneNumberChange = (event) => {
    const phoneNumberInput = event.target.value;
    setPhoneNumber(phoneNumberInput);
    setIsPhoneNumberValid(/^\d{10}$/.test(phoneNumberInput));
  };

  const togglePhoneNumberButton = () => {
    setIsPhoneNumberEditing(!isPhoneNumberEditing);
  };

  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
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
        <Box padding="40px">
          <Box className="home-heading">
            <Heading as="h1" size="3xl">
              Profile
            </Heading>
          </Box>

          <Box
            backgroundColor="white"
            borderRadius="30px"
            p="25px"
            mt="50px"
            mx="5%"
            boxShadow="md"
          >
            <Box maxW="lg" mx="auto" p={4}>
              <FormControl>
                <FormLabel fontSize="2xl">Name</FormLabel>
                <Input value={name} isDisabled bg="gray.200" />
              </FormControl>

              <FormControl mt="20px">
                <FormLabel fontSize="2xl">Email</FormLabel>
                <Input value={email} isDisabled bg="gray.200" />
              </FormControl>

              <FormControl mt="20px">
                <FormLabel fontSize="2xl">Phone Number</FormLabel>
                <Stack direction="row" align="center">
                  <InputGroup>
                    <InputLeftAddon children="+1" />
                    <Input
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      type="tel"
                      maxLength={10}
                      borderColor={isPhoneNumberValid ? "gray.300" : "red.500"}
                      isDisabled={!isPhoneNumberEditing}
                      bg={isPhoneNumberEditing ? "white" : "gray.200"}
                    />
                  </InputGroup>
                  {!isPhoneNumberEditing ? (
                    <Button onClick={togglePhoneNumberButton}>Edit</Button>
                  ) : (
                    <Button onClick={togglePhoneNumberButton}>Save</Button>
                  )}
                </Stack>
              </FormControl>
              <Center mt="40px" display="block">
                <FormLabel fontSize="2xl">Rating:</FormLabel>
                <Text textAlign="center" color="secondary.400" fontSize="4xl">
                  {rating}
                </Text>
              </Center>
            </Box>
          </Box>
          <Box
            backgroundColor="white"
            borderRadius="30px"
            p="25px"
            my="50px"
            mx="5%"
            boxShadow="md"
          >
            <Text textAlign="center" fontWeight="bold" fontSize="3xl">
              Rides you signed up for:{" "}
            </Text>
            <Box pt="20px">
              {rides && (
                <RideCardGrid
                  displayRatingButton
                  hideSignupButton
                  rides={rides}
                />
              )}
            </Box>
          </Box>
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Profile;
