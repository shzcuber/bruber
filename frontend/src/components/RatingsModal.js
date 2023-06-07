import {
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
      body: JSON.stringify({userId: props.driverID, rating})
    };

    fetch(`https://bruber-production.up.railway.app/add_rating`, requestOptions)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => console.log("Error: " + error));
  }

  const [rating, setRating] = useState(3)

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rate this driver</ModalHeader>
        <Select defaultValue={3} onChange={(e) => setRating(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Select>
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
