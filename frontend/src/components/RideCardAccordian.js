import {
  AccordionItem,
  AccordionButton,
  Flex,
  Avatar,
  Text,
  Box,
  UnorderedList,
  Spacer,
  AccordionIcon,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";

import { parseTime, getStarString } from "../utilities";
import { passengersToList } from "../utilities";
import RideSignupButton from "./RideSignupButton";

export default function RideCardAccordion(props) {
  console.log(props.rides);

  const rideAccordionItems = props.rides.map((ride, index) => {
    // Check if the user is already a passenger in the ride
    let userAlreadyPassenger = false;
    let passengerId = "";
    for (let passenger = 0; passenger < ride.passengers.length; passenger++) {
      passengerId = ride.passengers[passenger]["userId"];
      if (props.authUser.uid === passengerId) {
        console.log("ALREADY A PASSENGER", ride.passengers[passenger]["userId"]);
        userAlreadyPassenger = true;
        break;
      }
    }
    return (
    <AccordionItem
      key={index}
      background="white"
      color="primary.500"
      borderColor="primary.500"
    >
      <AccordionButton
        display="block"
        _expanded={{ bg: "primary.500", color: "white" }}
      >
        <Flex align="center">
          <Text fontWeight="bold" fontSize="xl">
            {parseTime(ride.startTime)}
          </Text>
          <Spacer />
          <Flex align="center" justify="left" minWidth="35%">
            <Flex gap="4" align="center">
              <Avatar name={ride.driverFirstName + " " + ride.driverLastName} />
              <Box textAlign="left">
                <Text as="b" fontSize="xl">
                  {ride.driverFirstName + " " + ride.driverLastName}
                </Text>
                <Text color="gold" fontSize="xl">
                  {ride.rating ? getStarString(ride.rating) : "(unrated)"}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel
        padding="0px"
        background="primary.150"
        color="primary.500"
      >
        <Box margin="15px">
          <Text p="10px" fontWeight="bold" fontSize="xl">
            {parseTime(ride.startTime)}
          </Text>
          <Text p="10px" fontWeight="bold" fontSize="xl">
            From: {ride.from}
          </Text>
          <Text p="10px" fontWeight="bold" fontSize="xl">
            To: {ride.to}
          </Text>
          <UnorderedList paddingLeft="25px" height="200px" overflow="hidden">
            {passengersToList(ride.passengers, ride.capacity)}
          </UnorderedList>
          <Text as="b" fontSize="2xl" paddingLeft="15px">
            {ride.capacity -
              ride.passengers.length +
              "/" +
              ride.capacity +
              " Spots Available"}
          </Text>
          <Box margin="25px 15px">
            {!userAlreadyPassenger && !(ride.capacity - ride.passengers.length == 0) && (
              <RideSignupButton authUser={props.authUser} rideId={ride.id} />
            )}
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )});

  return (
    <Accordion allowMultiple margin="20px 0px">
      {rideAccordionItems}
    </Accordion>
  );
}
