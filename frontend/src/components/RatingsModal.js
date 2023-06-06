import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function RatingsModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rate this driver</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button onClick={props.onConfirm} variant="ghost">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
