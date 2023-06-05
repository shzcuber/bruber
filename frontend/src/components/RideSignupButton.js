import { Button, useDisclosure } from "@chakra-ui/react";
import RideSignupModal from "./RideSignupModal";

const PLACEHOLDER_USER_ID = 'wOnGp3wuTOxjie6XR55f'

export default function RideSignupButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onClick = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({'rideId': props.rideId, 'userId': PLACEHOLDER_USER_ID})
        };

        fetch("http://localhost:3000/ride_signup", requestOptions)
            .then(res => res.json())  // Convert json to js object
            .then(data => {
                // console.log("Data received: " + data.status);
            })
            .catch(error => {
                console.log("Error: " + error);
            })
    }

    return (<> 
                <Button onClick={onClick}>Sign up</Button> 
                <RideSignupModal isOpen={isOpen} onClose={onClose}/>
            </>);
}