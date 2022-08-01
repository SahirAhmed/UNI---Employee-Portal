import React from "react";
//import styled from "styled-components";

// component imports
import Navbar from "../components/Navbar";
import UserStatus from "../components/UserStatus";
import Resources from "../components/Resources";
import LatestAnnouncement from "../components/LatestAnnouncement";
import { ChakraProvider, Box, Container, Stack } from "@chakra-ui/react";

// Home page - what users see when first logged in

export default function Home(props) {
  return (
    <ChakraProvider>
      <Box maxW="100vw" minH="100vh" bg="gray.100">
        <Navbar {...props} />
        <Container maxW="container.xl" py="10" px="6">
          <Stack
            direction={["column", "column", "row", "row"]}
            alignItems={["center", "center", "flex-start", "flex-start"]}
            spacing={[5, 5, 10, 10]}
          >
            <Stack spacing={5}>
              <UserStatus {...props} />
              <Resources />
            </Stack>
            <Box flex="1">
              <LatestAnnouncement {...props} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
