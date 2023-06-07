import RideCard from "./RideCard";
import { SimpleGrid } from "@chakra-ui/react";
import { parseTime } from "../utilities";

export default function RideCardGrid(props) {
  // console.log(props.rides[1].driverID)
  const rideCardList = props.rides.map((ride, index) => {
    console.log(ride, props.rides)
    return (
    <RideCard
      key={index}
      driver={ride.driverFirstName}
      time={parseTime(ride.startTime)}
      from={ride.from}
      driverID={ride.driverID._key.path.segments[6]}
      to={ride.to}
      capacity={ride.capacity}
      names={ride.passengers}
      rideId={ride.id}
      rating={ride.rating}
      hideSignupButton={props.hideSignupButton}
      authUser={props.authUser}
      displayRatingButton={props.displayRatingButton}
    />
  )});
  return (
    <SimpleGrid
      spacingX="40px"
      spacingY="20px"
      margin="2% 4%"
    >
      {rideCardList}
    </SimpleGrid>
  );
}