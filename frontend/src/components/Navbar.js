import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { userSignOut } from "../pages/auth";
import { useNavigate } from "react-router";

const Navbar = (props) => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <HStack
      py={{ base: "4", lg: "5" }}
      width="100hh"
      alignContent="center"
      justifyContent="center"
      backgroundColor="primary.700"
      height="70px"
    >
      <Flex justify="space-between" flex="1" width="100hh" padding="0px 40px">
        <ButtonGroup variant="link" spacing="8">
          <Button
            onClick={() => navigate("/")}
            color="white"
            _active={{ transform: "scale(0.98)", color: "grey" }}
            fontSize="xl"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/profile")}
            color="white"
            _active={{ transform: "scale(0.98)", color: "grey" }}
            fontSize="xl"
          >
            Profile
          </Button>
          <Button
            onClick={() => navigate("/rides")}
            color="white"
            _active={{ transform: "scale(0.98)", color: "grey" }}
            fontSize="xl"
          >
            Search
          </Button>
          <Button
            onClick={() => navigate("/upcoming_rides")}
            color="white"
            _active={{ transform: "scale(0.98)", color: "grey" }}
            fontSize="xl"
          >
            Upcoming
          </Button>
          <Button
            onClick={() => navigate("/about")}
            color="white"
            _active={{ transform: "scale(0.98)", color: "grey" }}
            fontSize="xl"
          >
            About Us
          </Button>
        </ButtonGroup>
        <Spacer />
        <HStack spacing="3">
           {props.authUser ? (
            <Button onClick={userSignOut} bg={"white"} variant="ghost">
              Log Out
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} bg={"white"} variant="ghost">
              Log In
            </Button>
          )}
          
        </HStack>
      </Flex>
    </HStack>
  );
};

export default Navbar;
