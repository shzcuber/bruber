import { ListItem, Text } from "@chakra-ui/react";

export function passengersToList(passengers, capacity) {
  let emptyList = Array(capacity - passengers.length).fill("Empty");
  const peopleList = [...passengers, ...emptyList].map((passenger, index) => {
    return (
      <ListItem key={index} paddingLeft="15px">
        <Text fontSize="2xl">{passenger.first ? passenger.first + " " + passenger.last : "Empty"}</Text>
      </ListItem>
    );
  });
  return peopleList;
}