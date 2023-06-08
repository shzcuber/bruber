import { ListItem, Text } from "@chakra-ui/react";

export function passengersToList(passengers, capacity, displayAdditonalInfo) {
  let emptyList = Array(capacity - passengers.length).fill("Empty");
  const peopleList = [...passengers, ...emptyList].map((passenger, index) => {
    return (
      <ListItem key={index} paddingLeft="15px">
        <Text fontSize="lg">
          {
            passenger.firstName 
            ? passenger.firstName
              + (displayAdditonalInfo ? (
                (passenger.lastName ? " " + passenger.lastName : "")
                + " - " 
                + (passenger.phoneNumber ? " " + parsePhoneNumber(passenger.phoneNumber) : "")
                ) : "")
            : "Empty"
          }
        </Text>
      </ListItem>
    );
  });
  return peopleList;
}

function parsePhoneNumber(str) {
  const areaCode = str.slice(0, 3);
  const prefix = str.slice(3, 6);
  const lineNumber = str.slice(6);
  
  const phoneNumber = `(${areaCode}) ${prefix}-${lineNumber}`;
  return phoneNumber;
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
    String(hour).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    " " +
    half
  );
}
export function getCurrentTime() {
  return new Date().toISOString()
}
export function getStarString(rating) {
  if (rating < 0.5) return "☆☆☆☆☆";
  else if (rating < 1.5) return "★☆☆☆☆";
  else if (rating < 2.5) return "★★☆☆☆";
  else if (rating < 3.5) return "★★★☆☆";
  else if (rating < 4.5) return "★★★★☆";
  else return "★★★★★";
}
