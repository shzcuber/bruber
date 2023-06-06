import {
  Card,
  CardHeader,
  Box,
  Flex,
  Avatar,
  CardBody,
  VStack,
  UnorderedList,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import RideSignupButton from "./RideSignupButton";
import { useDisclosure } from "@chakra-ui/react";

import RatingsModal from "./RatingsModal";
import { passengersToList, getStarString } from "../utilities";

export default function RideCard(props) {
  /* props will have:
   * a driver,
   * a time,
   * a list of names that are part of the carpool group,
   * a carpool capacity (will fill any vacancies with "empty")
   */
  // console.log(props);
  const peopleList = passengersToList(props.names, props.capacity);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const capacityReached = props.capacity - props.names.length === 0;
  return (
    <Card variant="rideCard">
      <CardHeader>
        <Flex align="center" justify="space-between">
          <Flex gap="4" align="center">
            <Avatar name={props.driver} />
            <Box textAlign="left">
              <Text as="b" fontSize="xl">
                {props.driver}
              </Text>
              <Text fontSize="xl">Driver</Text>
            </Box>
          </Flex>
          <Text color="gold" fontSize="xl" mr="25%">
            {props.rating ? getStarString(props.rating) : "★★★☆☆"}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="left">
          <Text as="b" fontSize="3xl">
            {props.time}
          </Text>
          <Text as="b" fontSize="xl">
            From: {props.from}
          </Text>
          <Text as="b" fontSize="xl">
            To: {props.to}
          </Text>
          <UnorderedList paddingLeft="25px" height="150px" overflow="hidden">
            {peopleList}
          </UnorderedList>
          <Text as="b" fontSize="2xl">
            {props.capacity -
              props.names.length +
              "/" +
              props.capacity +
              " Spots Available"}
          </Text>
          {!capacityReached && !props.hideSignupButton && (
            <RideSignupButton authUser={props.authUser} rideId={props.rideId} />
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        {props.displayRatingButton && (
          <Button onClick={onOpen} colorScheme="secondary">
            Rate Driver
          </Button>
        )}
        <RatingsModal
          driverID={props.driverID}
          isOpen={isOpen}
          onClose={onClose}
        />
      </CardFooter>
    </Card>
  );
}
