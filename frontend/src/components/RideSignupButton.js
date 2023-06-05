import { Button } from "@chakra-ui/react";

export default function RideSignupButton(props) {
    const onClick = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({'rideId': props.rideId, 'userId': "CNXrkcnsWfkiIeh2iL4C"})
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

    return <Button onClick={onClick}>Sign up</Button>
}