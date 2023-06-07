import { Button, useDisclosure } from "@chakra-ui/react";
import RideSignupModal from "./RideSignupModal";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER_USER_ID = "wOnGp3wuTOxjie6XR55f";

export default function RideSignupButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const onClick = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rideId: props.rideId,
        userId: props.authUser.uid,
      }),
    };

        fetch("https://bruber-production.up.railway.app/ride_signup", requestOptions)
            .then(data => {
                navigate('/profile')
            })
            .catch(error => {
                console.log("Error: " + error);
            })
    }

  return (
    <>
      <Button onClick={onOpen} colorScheme="secondary">
        Sign up
      </Button>
      <RideSignupModal isOpen={isOpen} onClose={onClose} onConfirm={onClick} />
    </>
  );
}
