import { useEffect, useState } from 'react';
import { updateProfile } from "firebase/auth";
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";


function Onboarding(props)  {
  console.log(process.env.REACT_APP_TEST)

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(props.authUser.email || '');

  var isFirstNameValid = firstName.length > 1;
  var isLastNameValid = lastName.length > 1;
  var isPhoneNumberValid = /^\d{10}$/.test(phoneNumber);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`{process.env.REACT_APP_BACKEND}/user/${props.authUser.uid}`, requestOptions)
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        setPhoneNumber(data.phoneNumber || '');
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
      })
      .catch((error) => console.log("Error: " + error));
  }, [])

  const handleOnboardingSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        'uid': props.authUser.uid,
        'firstName': firstName,
        'lastName': lastName,
        'email': props.authUser.email,
        'phoneNumber': phoneNumber
      })
    };

    fetch("{process.env.REACT_APP_BACKEND}/create_user", requestOptions)
      .then(data => {
      })
      .catch(error => {
          console.log("Error: " + error);
      })
    
    // Refresh the router by navigating to the current location
    // TODO somehow run refreshUserData in auth instead of this
    window.location.reload();
  }

  return (
    <Box className='home-container' color="primary.700">
      <Navbar />
      <Box mt="5%" mx="5%" className="home-heading">
        <Heading as="h1" size="2xl">
          Add/Change Your Information
        </Heading>
      </Box>

      <Box backgroundColor="white" borderRadius="30px" p="25px" mt="50px" mx="5%" boxShadow="md">
        <Box maxW="lg" mx="auto" p={4}>
          <FormControl>
            <FormLabel fontSize="2xl">Email</FormLabel>
            <Input value={email} isDisabled bg="gray.200" />
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="2xl">First Name</FormLabel>
            <Input
              value={firstName}
              onChange={(event) => {setFirstName(event.target.value)}}
              bg="white"
              borderColor={isFirstNameValid ? "gray.300" : "red.500"}
            />
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="2xl">Last Name</FormLabel>
            <Input
              value={lastName}
              onChange={(event) => {setLastName(event.target.value)}}
              bg="white"
              borderColor={isLastNameValid ? "gray.300" : "red.500"}
            />
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="2xl">Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                value={phoneNumber}
                onChange={(event) => {setPhoneNumber(event.target.value)}}
                bg="white"
                type="tel"
                maxLength={10}
                borderColor={isPhoneNumberValid ? "gray.300" : "red.500"}
              />
            </InputGroup>
          </FormControl>

          <Button
            type='continue'
            mt="50px"
            width="100%"
            isDisabled={!(isFirstNameValid) || !isLastNameValid || !isPhoneNumberValid}
            onClick={handleOnboardingSubmit}
          >
            Continue to Site
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Onboarding;
