import { Button, useDisclosure } from "@chakra-ui/react";
import RideSignupModal from "./RideSignupModal";
import { useNavigate } from 'react-router-dom';

const PLACEHOLDER_USER_ID = 'wOnGp3wuTOxjie6XR55f'

export default function RideSignupButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const onClick = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({'rideId': props.rideId, 'userId': PLACEHOLDER_USER_ID})
        };

        fetch("http://localhost:3000/ride_signup", requestOptions)
            .then(data => {
                console.log("I AM SIGNED UP")
                navigate('/profile')
                console.log("navigated")
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