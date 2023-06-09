import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Image,
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
import logo from "./component_assets/navbar-icon.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const navbarHeight = 70; //px
  const iconHeight = 50; //px
  return (
    <Flex
      py={{ base: "4", lg: "5" }}
      align="center"
      justifyContent="space-between"
      backgroundColor="primary.700"
      height={navbarHeight}
      px={4}
    >
      <Flex align="center" justify="space-between" flex="1" mx="5%">
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
                  <MenuItem onClick={() => navigate("/create_ride")}>
                    Create
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
        <Image
          src={logo}
          alt="Bruber Logo"
          objectFit="scale-down"
          maxH={iconHeight}
          onClick={() => navigate("/")}
          cursor="pointer"
          mr="30px"
          _active={{ transform: "scale(0.95)" }}
        ></Image>
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
            onClick={() => navigate("/create_ride")}
            color="white"
            fontSize="xl"
            _active={{ transform: "scale(0.98)", color: "grey" }}
          >
            Create
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
