import {
    Heading,
    Box,
    Text,
    UnorderedList,
    ListItem,
    SlideFade,
  } from '@chakra-ui/react';
  import Navbar from '../components/Navbar';
  
  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };
  function About(props)  {
    return (
      <Box className='home-container' color="primary.700">
        <Navbar authUser={props.authUser}/>
        <SlideFade
          in={true}
          direction="down"
          offsetY="20px"
          unmountOnExit={true}
          transition={transitionProp}
        >
          <Box mx="5%" my="40px">
            <Box className="home-heading">
              <Heading fontWeight="bold" m="40px 0" size="3xl" as="h1">
                About
              </Heading>
            </Box>
      
            <Box backgroundColor="white" borderRadius="30px" padding="20px" boxShadow="md">
              <Box maxW="xl" mx="auto" p={4}>
                <Heading as="h2" size="lg" mb={4}>
                  What is Bruber?
                </Heading>
                <Text>
                  Bruber is a ridesharing coordination app designed specifically for UCLA students (Go 
                  Bruins!). It aims to provide a convenient platform for Bruins to coordinate and share 
                  rides to and from campus or other locations such as LAX or other campuses.
                </Text>
      
                <Heading as="h2" size="lg" mt={8} mb={4}>
                  Features
                </Heading>
                <UnorderedList>
                  <ListItem>Easy ride coordination: Bruber allows users to easily coordinate and schedule rides with fellow Bruins.</ListItem>
                  <ListItem>Flexible scheduling: Bruins can schedule rides in advance or find immediate rides based on their preferences and availability.</ListItem>
                </UnorderedList>
      
                <Heading as="h2" size="lg" mt={8} mb={4}>
                  How to Use Bruber?
                </Heading>
                <UnorderedList>
                  <ListItem>Go to the Bruber website</ListItem>
                  <ListItem>Create an account with an email/password combination or your Google account.</ListItem>
                  <ListItem>Set up your profile with your name and phone number.</ListItem>
                  <ListItem>Explore available rides or create a new ride listing as a driver.</ListItem>
                  <ListItem>When you find a suitable ride or a passenger, coordinate the details with your fellow Bruberers through the given contact information.</ListItem>
                  <ListItem>Complete the ride and leave feedback for your fellow Bruins to help maintain a reliable community.</ListItem>
                </UnorderedList>
      
                <Text mt={8}>
                  Bruber is committed to enhancing the transportation experience for UCLA students by 
                  fostering a strong community of Bruins who can rely on each other for ridesharing 
                  needs. Start using Bruber today and make your commute easier and more enjoyable!
                </Text>
              </Box>
            </Box>
          </Box>
        </SlideFade>
      </Box>
    );
  }
  
  export default About;
  