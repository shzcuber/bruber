import { useState } from 'react';
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react';

function Profile()  {
  const [nickname, setNickname] = useState('Joe Bruin');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [isNicknameEditing, setIsNicknameEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
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
      <Box mt="5%" mx="5%" className="home-heading">
          <Heading as="h1" size="4xl">
            Profile
          </Heading>
      </Box>

      <Box backgroundColor="white" borderRadius="30px" p="25px" mt="50px" mx="5%">
        <Box maxW="lg" mx="auto" p={4}>
          <FormControl>
            <FormLabel fontSize="2xl">Name</FormLabel>
            <Input value="Joseph Bruin" isReadOnly bg="gray.200"/>
          </FormControl>

          <FormControl mt="20px">
            <FormLabel fontSize="2xl">Email</FormLabel>
            <Input value="joebruin@g.ucla.edu" isReadOnly bg="gray.200"/>
          </FormControl>

          <FormControl mt="20px">
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
          </FormControl>

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
    </Box>
  );
}


export default Profile;