import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { userSignOut } from "../pages/auth"
import { useNavigate } from 'react-router'

 const Navbar = () => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" m='0' p='0'>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  <Button onClick={() => navigate('/')}>Home</Button>
                  <Button onClick={() => navigate('/profile')}>Profile</Button>
                  <Button onClick={() => navigate('/rides')}>Rides</Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Button onClick={userSignOut} bg={"white"} variant="ghost">Log Out</Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Navbar;