import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { userSignOut } from "../pages/auth";
import { useNavigate } from "react-router";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <Flex
      py={{ base: "4", lg: "5" }}
      align="center"
      justifyContent="space-between"
      backgroundColor="primary.700"
      height="70px"
      px={4}
    >
      <Flex justify="space-between" flex="1" mx="5%">
        <Box display={{ base: "block", lg: "none" }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  icon={<FiMenu />}
                  variant="ghost"
                  color={isOpen ? "primary.700" : "white"}
                  aria-label="Menu"
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/rides")}>Search</MenuItem>
                  <MenuItem onClick={() => navigate("/upcoming_rides")}>
                    Upcoming
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/about")}>
                    About Us
                  </MenuItem>
                  <MenuDivider />
                  {props.authUser ? (
                    <MenuItem onClick={userSignOut}>Log Out</MenuItem>
                  ) : (
                    <MenuItem onClick={() => navigate("/login")}>
                      Log In
                    </MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <ButtonGroup
          variant="link"
          spacing="8"
          my="auto"
          display={{ base: "none", lg: "block" }}
        >
          <Button
            onClick={() => navigate("/")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/profile")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            Profile
          </Button>
          <Button
            onClick={() => navigate("/rides")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            Search
          </Button>
          <Button
            onClick={() => navigate("/upcoming_rides")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => navigate("/about")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            About Us
          </Button>
        </ButtonGroup>
        <Spacer />
        <HStack spacing="3" display={{ base: "none", lg: "block" }}>
          {props.authUser ? (
            <Button onClick={userSignOut} bg={"white"} variant="ghost">
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              bg={"white"}
              variant="ghost"
            >
              Log In
            </Button>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
