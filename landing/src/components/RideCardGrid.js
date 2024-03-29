import RideCard from "./RideCard";
import { SimpleGrid } from "@chakra-ui/react";
import { parseTime } from "../utilities";

export default function RideCardGrid(props) {
  console.log(props.rides)
  const rideCardList = props.rides.map((ride, index) => (
    <RideCard
      key={index}
      driver={ride.driverFirstName}
      time={parseTime(ride.startTime)}
      from={ride.from}
      to={ride.to}
      capacity={ride.capacity}
      names={ride.passengers}
      rating={ride.rating}
      rideId={ride.id}
      hideSignupButton={props.hideSignupButton}
      authUser={props.authUser}
    />
  ));
  return (
    <SimpleGrid
      minChildWidth="350px"
      spacingX="40px"
      spacingY="20px"
      margin="10px 35px"
    >
      {rideCardList}
    </SimpleGrid>
  );
}