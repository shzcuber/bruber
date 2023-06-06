import { ListItem, Text } from "@chakra-ui/react";

export function passengersToList(passengers, capacity) {
  let emptyList = Array(capacity - passengers.length).fill("Empty");
  const peopleList = [...passengers, ...emptyList].map((passenger, index) => {
    return (
      <ListItem key={index} paddingLeft="15px">
        <Text fontSize="2xl">
          {passenger.firstName ? passenger.firstName : "Empty"}
        </Text>
      </ListItem>
    );
  });
  return peopleList;
}

export const sampleLocations = [
  "LAX",
  "UCSD",
  "UCI",
  "UCR",
  "UCB",
  "UCSB",
  "UCLA",
];

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
export function getCurrentTime() {
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  var time =
    String(today.getHours()).padStart(2, "0") + ":" + today.getMinutes();
  return date + "T" + time;
}
export function getStarString(rating) {
  if (rating < 0.5) return "☆☆☆☆☆";
  else if (rating < 1.5) return "★☆☆☆☆";
  else if (rating < 2.5) return "★★☆☆☆";
  else if (rating < 3.5) return "★★★☆☆";
  else if (rating < 4.5) return "★★★★☆";
  else return "★★★★★";
}
