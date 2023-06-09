import RideCard from "./RideCard";
import { SimpleGrid } from "@chakra-ui/react";
import { parseTime } from "../utilities";

export default function RideCardGrid(props) {
  // console.log(props.rides[1].driverID)
  const rideCardList = props.rides.map((ride, index) => {
    const rideDriverID = ride.driverID._key.path.segments[6];
    let displayRatingButton = false;
    if (props.displayAdditonalInfo && props.authUser.uid !== rideDriverID){
      displayRatingButton = true;
    }
    // Check if the user is already a passenger in the ride
    let userAlreadyPassenger = false;
    let passengerId = "";
    for (let passenger = 0; passenger < ride.passengers.length; passenger++) {
      passengerId = ride.passengers[passenger]["userId"];
      if (props.authUser.uid === passengerId) {
        userAlreadyPassenger = true;
        break;
      }
    }
    if (props.authUser.uid === rideDriverID) {
      userAlreadyPassenger = true;
    }
    console.log(ride, props.rides);
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
        userAlreadyPassenger={userAlreadyPassenger}
        authUser={props.authUser}
        displayRatingButton={displayRatingButton}
        displayAdditonalInfo={props.displayAdditonalInfo}
      />
    );
  });
  return (
    <SimpleGrid spacingX="40px" spacingY="20px" margin="2% 4%" columns={{ base: "1", lg: "2" }}>
      {rideCardList}
    </SimpleGrid>
  );
}
