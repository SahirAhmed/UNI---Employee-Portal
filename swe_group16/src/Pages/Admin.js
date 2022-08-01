import React from "react";
// components import
import Navbar from '../components/Navbar';
import CreateUserForm from '../components/CreateUserForm';
import { ChakraProvider, Divider, Heading, Box, Container, Text } from "@chakra-ui/react";

// admin page - just shows create user form
export default function Admin(props) {
  return (
    <ChakraProvider>
      <Box maxW="100vw" minH="100vh" bg="gray.100">
        <Navbar {...props} />
        <Container maxW="container.xl" py="10" px="6">
          <Box
            bg="white"
            boxShadow="base"
            maxW="container.md"
            margin="auto"
            rounded="lg"
          >
            <Heading fontSize="2xl" px={8} py={6}>Create User</Heading>
            <Divider borderColor="gray.200" />
            <Box px={8} py={6}>
              {
                props.user.role === "Admin" &&
                <CreateUserForm />
              }
              {
                props.user.role !== "Admin" &&
                <Text textAlign="center" fontSize="lg" color="gray.600">Sorry, only system administrators can create users.</Text>
              }
            </Box>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
