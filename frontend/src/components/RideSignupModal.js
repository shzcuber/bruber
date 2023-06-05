import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton } from "@chakra-ui/react"

export default function RideSignupModal(props) {
    return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Are you sure you want to join this ride?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
            Close
            </Button>
            <Button variant='ghost'>Confirm</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    )
}