import { useEffect, useState } from 'react';
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

const PLACEHOLDER_USER_ID = 'wOnGp3wuTOxjie6XR55f'


function Onboarding(props)  {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handlePhoneNumberChange = (event) => {
    const phoneNumberInput = event.target.value;
    setPhoneNumber(phoneNumberInput);
    setIsPhoneNumberValid(/^\d{10}$/.test(phoneNumberInput));
  };

  const handleNameChange = (event) => {
    const nameInput = event.target.value;
    setName(nameInput);
    setIsNameValid(nameInput.length > 2);
  };

  const handleOnboardingSubmit = () => {
    //send values to backend
  }

  return (
    <Box className='home-container'>
      <Navbar />
      <Box mt="5%" mx="5%" className="home-heading">
        <Heading as="h1" size="3xl">
          Add/Change Your Information
        </Heading>
      </Box>

      <Box backgroundColor="white" borderRadius="30px" p="25px" mt="50px" mx="5%">
        <Box maxW="lg" mx="auto" p={4}>
          <FormControl>
            <FormLabel fontSize="2xl">Email</FormLabel>
            <Input value={email} isReadOnly bg="gray.200" />
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="2xl">Name</FormLabel>
            <Input
              value={name}
              onChange={handleNameChange}
              bg="white"
              borderColor={isNameValid ? "gray.300" : "red.500"}
            />
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="2xl">Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
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
            isDisabled={!isNameValid || !isPhoneNumberValid}
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
