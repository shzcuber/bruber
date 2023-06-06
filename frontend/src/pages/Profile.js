import { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';
import RideCardGrid from '../components/RideCardGrid';
import Navbar from '../components/Navbar';

const PLACEHOLDER_USER_ID = 'wOnGp3wuTOxjie6XR55f'

function Profile(props)  {
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:3000/user/${props.authUser.uid}`, requestOptions)
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setName(data.firstName);
        let rides = []
        data.rides.forEach(ride => 
          // console.log('ride: ',JSON.parse(ride.rideData))
          rides.push(JSON.parse(ride.rideData))
        );
        setRides(rides);
      })
      .catch((error) => console.log("Error: " + error));
  }, [])

  const [name, setName] = useState();
  const [rides, setRides] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [email, setEmail] = useState('');
  const [isNicknameEditing, setIsNicknameEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);

  const handleNicknameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const toggleNicknameButton = () => {
    setIsNicknameEditing(!isNicknameEditing);
  };

  const togglePhoneNumberButton = () => {
    setIsPhoneNumberEditing(!isPhoneNumberEditing);
  };


  return (
    <Box className='home-container'>
      <Navbar />
      <Box mt="5%" mx="5%" className="home-heading">
          <Heading as="h1" size="4xl">
            Profile
          </Heading>
      </Box>

      <Box backgroundColor="white" borderRadius="30px" p="25px" mt="50px" mx="5%">
        <Box maxW="lg" mx="auto" p={4}>
          <FormControl>
            <FormLabel fontSize="2xl">Name</FormLabel>
            <Input value={name} isReadOnly bg="gray.200"/>
          </FormControl>

          <FormControl mt="20px">
            <FormLabel fontSize="2xl">Email</FormLabel>
            <Input value={email} isReadOnly bg="gray.200"/>
          </FormControl>

          {/* <FormControl mt="20px">
            <FormLabel fontSize="2xl">Nickname</FormLabel>
            <Stack direction="row" align="center">
              <Input
                value={nickname}
                isReadOnly={!isNicknameEditing}
                onChange={handleNicknameChange}
                bg={isNicknameEditing ? "white" : "gray.200"}
              />
              {!isNicknameEditing ? (
                <Button onClick={toggleNicknameButton}>Edit</Button>
              ) : (
                <Button onClick={toggleNicknameButton}>
                  Save
                </Button>
              )}
            </Stack>
          </FormControl> */}

          <FormControl mt="20px">
            <FormLabel fontSize="2xl">Phone Number</FormLabel>
            <Stack direction="row" align="center">
              <Input
                value={phoneNumber}
                isReadOnly={!isPhoneNumberEditing}
                onChange={handlePhoneNumberChange}
                bg={isPhoneNumberEditing ? "white" : "gray.200"}
                type='tel'
              />
              {!isPhoneNumberEditing ? (
                <Button onClick={togglePhoneNumberButton}>Edit</Button>
              ) : (
                <Button onClick={togglePhoneNumberButton}>
                  Save
                </Button>
              )}
            </Stack>
          </FormControl>
        </Box>
      </Box>
      <Box backgroundColor="white" borderRadius="30px" p="25px" mt="50px" mx="5%">
        <Text textAlign='center' fontWeight='b' fontSize='3xl'>Rides you signed up for: </Text>
        {rides && <RideCardGrid hideSignupButton rides={rides} /> }
      </Box>
    </Box>
  );
}


export default Profile;