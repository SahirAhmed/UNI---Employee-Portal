import React, { useState } from "react";
import { auth } from "../firebase";
import logoImg from "../assets/logowhite.png";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Stack,
  Link,
  Button,
  Box,
  Flex,
  Spacer,
  IconButton,
  Container,
  ChakraProvider,
  Image,
  extendTheme,
} from "@chakra-ui/react";

const NavLink = ({ children, to, ...props }) => {
  return (
    <Button
      as={RouterLink}
      to={to}
      bg="gray.900"
      color="white"
      _active={{ bg: "blue.800" }}
      _hover={{
        color: "blue.500",
      }}
      activeStyle={{
        background: "#2C5282",
        color: "white",
      }}
    >
      {children}
    </Button>
  );
};

// Navbar which is displayed at the top of every page
// uses NavLink from react router for declarative routing to pages
export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const signOut = () => auth.signOut();

  const breakpoints = createBreakpoints({
    sm: "42em",
    md: "54em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });
  const theme = extendTheme({ breakpoints });

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.900" boxShadow="md">
        <Container maxW="container.xl" p="0">
          <Flex
            py="4"
            px="6"
            direction={["column", "column", "row"]}
            justify="space-between"
          >
            <Flex align="center">
              <Link
                as={RouterLink}
                to="/home"
                _hover={{ opacity: 0.5 }}
                _active={{ opacity: 0.25 }}
              >
                <Image src={logoImg} h="9" />
              </Link>
              <Spacer />
              <IconButton
                display={["inline-block", "inline-block", "none"]}
                icon={
                  isOpen ? (
                    <CloseIcon w="3.5" h="3.5" />
                  ) : (
                    <HamburgerIcon w="5" h="5" />
                  )
                }
                onClick={toggleIsOpen}
                bg="gray.900"
                color="white"
                _active={{ bg: "gray.900" }}
                _hover={{ bg: "gray.900" }}
              />
            </Flex>
            <Stack
              direction={["column", "row"]}
              display={[isOpen ? "flex" : "none", null, "flex"]}
              spacing="4"
              justify="space-between"
              align="center"
              pt={[4, 4, 0]}
            >
              <NavLink to="/announcements">Announcements</NavLink>
              <NavLink to="directory">Employee Directory</NavLink>
              {user.role === "Admin" && <NavLink to="/admin">Admin</NavLink>}
              <NavLink to="profile">Account</NavLink>
              <Button
                onClick={signOut}
                bg="blue.600"
                color="white"
                _active={{ bg: "blue.800" }}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign Out
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
