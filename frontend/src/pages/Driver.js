import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function Driver(props) {
  return (
    <Box>
      <Navbar authUser={props.authUser}/>
      <Center py={160}>
        <Box
          
          boxShadow='dark-lg'
          rounded='md'
          w="80%"
          backgroundColor="white"
          overflow={'hidden'}>

            <Flex justify={'center'} h={'140px'}
              w={'full'}
              backgroundColor="white" backgroundColor="black" >
              
            </Flex>
    

          
          <Flex justify={'center'} mt={-16}>
            <Avatar
              size={'xxl'}
              src="data:image/png;base64,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"
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>

          <Box p={8}>
            
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading color="black" fontSize={'3xl'} fontWeight={500} fontFamily={'Uber Move Text'}>
                Bruber Man
              </Heading>
            </Stack>

            <Stack spacing={0} align={'center'} mb={5}>
              <Heading color="black" fontSize={'3xl'} fontWeight={500} fontFamily={'Uber Move Text'}>
                Email: bruberman@ucla.edu
              </Heading>
            </Stack>

            <Stack spacing={0} align={'center'} mb={5}>
              <Heading color="black" fontSize={'3xl'} fontWeight={500} fontFamily={'Uber Move Text'}>
                Phone: +1 (238) 238-2387
              </Heading>
            </Stack>

            <Stack spacing={0} align={'center'} mb={5}>
              <Heading color="black" fontSize={'3xl'} fontWeight={500} fontFamily={'Uber Move Text'}>
                Rating: ⭐️⭐️⭐️⭐️⭐️
              </Heading>
            </Stack>

            
          </Box>
        </Box>
      </Center>
    </Box>
  );
}