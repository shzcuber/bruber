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
} from "@chakra-ui/react";
import RideSignupButton from "./RideSignupButton";

import { passengersToList } from "../utilities";

export default function RideCard(props) {
  /* props will have:
   * a driver,
   * a time,
   * a list of names that are part of the carpool group,
   * a carpool capacity (will fill any vacancies with "empty")
   */
  // console.log(props);
  const peopleList = passengersToList(props.names, props.capacity);
  return (
    <Card variant="rideCard">
      <CardHeader>
        <Flex gap="4" align="center">
          <Avatar name={props.driver} />
          <Box>
            <Text as="b" fontSize="xl">
              {props.driver}
            </Text>
            <Text fontSize="xl">Driver</Text>
          </Box>
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
          {!props.hideSignupButton && <RideSignupButton authUser={props.authUser} rideId={props.rideId} />}
        </VStack>
      </CardBody>
      <CardFooter>
        {!props.hideSignupButton && <RideSignupButton rideId={props.rideId} />}
      </CardFooter>
    </Card>
  );
}
