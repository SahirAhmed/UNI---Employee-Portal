import React from "react";

// components import
import Navbar from "../components/Navbar";
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  Heading,
  Divider,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import DirectoryProfile from "../components/DirectoryProfile";

// employee directory
// will show all employees and their information
export default function EmployeeDirectory({ users, user }) {
  let usersList = users.map((user) => (
    <DirectoryProfile key={user.id} user={user} />
  ));

  // No employees are in the employee directory.
  if (usersList.length === 0) {
    usersList = <Text color="gray.600">The employee directory is empty.</Text>;
  }

  return (
    <ChakraProvider>
      <Box maxW="100vw" minH="100vh" bg="gray.100">
        <Navbar user={user} />
        <Container maxW="container.xl" py="10" px="6">
          <Box
            bg="white"
            boxShadow="base"
            maxW="container.lg"
            margin="auto"
            rounded="lg"
          >
            <Heading px={8} py={6} fontSize="2xl">
              Employee Directory
            </Heading>
            <Divider />
            <Box px={8} py={6}>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                alignItems="flex-start"
                spacing="6"
              >
                {usersList}
              </VStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
