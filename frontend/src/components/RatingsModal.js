import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function RatingsModal(props) {
  const onConfirm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({rideId: props.rideId, rating})
    };
    console.log(props)

    fetch(`{process.env.REACT_APP_BACKEND}/add_rating`, requestOptions)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => console.log("Error: " + error));
  };

  const [rating, setRating] = useState(3);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="primary.700">Rate this driver</ModalHeader>
        <Box padding="0px 20px">
          <Select defaultValue={3} onChange={(e) => setRating(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Select>
        </Box>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button onClick={onConfirm} variant="ghost">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
