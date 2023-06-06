import { ListItem, Text } from "@chakra-ui/react";

export function passengersToList(passengers, capacity) {
  let emptyList = Array(capacity - passengers.length).fill("Empty");
  const peopleList = [...passengers, ...emptyList].map((passenger, index) => {
    return (
      <ListItem key={index} paddingLeft="15px">
        <Text fontSize="2xl">{passenger.firstName ? passenger.firstName + " " + passenger.lastName : "Empty"}</Text>
      </ListItem>
    );
  });
  return peopleList;
}

export const sampleLocations = ["LAX", "UCSD", "UCI", "UCR", "UCB", "UCSB", "UCLA"];

export function parseTime(time) {
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const timeArray = time.split("-");
  const dayTime = timeArray[2].split("T");
  const day = dayTime[0];
  const timeOfDay = dayTime[1];
  const hourMinutes = timeOfDay.split(":");
  let hour = parseInt(hourMinutes[0]);
  const minutes = hourMinutes[1];
  let half = "AM"; //AM or PM
  if (hour > 12) {
    hour -= 12;
    half = "PM";
  }
  if (hour === 0) hour = 12;
  return (
    monthNames[parseInt(timeArray[1])] +
    " " +
    day +
    ", " +
    timeArray[0] +
    " at " +
    hour +
    ":" +
    minutes +
    " " +
    half
  );
}