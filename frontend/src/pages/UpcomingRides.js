import { Text, Box, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import RidesDisplay from "./RidesDisplay";
import { useEffect, useState } from "react";

export default function UpcomingRides(props) {
  const [rides, setRides] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const data = {
      startTime: new Date(),
    };

    const searchParameters = new URLSearchParams(data).toString();

    fetch(`http://localhost:3000/get_rides?${searchParameters}`, requestOptions)
      .then((res) => res.json()) // Convert json to js object
      .then((data) => {
        setRides(data);
      })
      .catch((error) => console.log("Error: " + error));
  }, []);
  return (
    <Box>
      <Navbar />
      <Box margin="40px" color="primary.700">
        <Heading fontWeight="bold" m="40px 0" size="3xl" as="h1">
          All Upcoming Rides
        </Heading>
        <Box backgroundColor="primary.100" padding="20px" borderRadius="20px">
          <RidesDisplay authUser={props.authUser} rides={rides} />
        </Box>
      </Box>
    </Box>
  );
}
