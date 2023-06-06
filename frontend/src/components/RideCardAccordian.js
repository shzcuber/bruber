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
    Accordion
} from "@chakra-ui/react";

import { parseTime } from "../utilities";
import { passengersToList } from "../utilities";
import RideSignupButton from "./RideSignupButton";

export default function RideCardAccordion(props) {
  const rideAccordionItems = props.rides.map((ride, index) => (
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
          <Flex gap="4" align="center">
            <Avatar name={ride.driverFirstName} />
            <Box textAlign="left">
              <Text as="b" fontSize="xl">
                {ride.driverFirstName}
              </Text>
              <Text fontSize="xl">Driver</Text>
            </Box>
          </Flex>
          <Spacer />
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
          <UnorderedList paddingLeft="25px" height="150px" overflow="hidden">
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
            <RideSignupButton authUser={props.authUser} rideId={ride.id} />
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Accordion allowMultiple margin="20px 0px">
      {rideAccordionItems}
    </Accordion>
  );
}