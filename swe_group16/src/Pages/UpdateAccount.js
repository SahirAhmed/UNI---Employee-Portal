import Navbar from "../components/Navbar";
import UpdateAccountForm from "../components/UpdateAccountForm";
import UpdateEmailPassword from "../components/UpdateEmailPassword";
import { Heading, Box, Divider } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function UpdateAccount(props) {
  return (
    <div>
      <Navbar {...props} />
      <ChakraProvider>
        <Box bg="gray.100" minH="100vh" p="12">
          <Box
            bg="white"
            mx="auto"
            maxW="container.lg"
            rounded="lg"
            boxShadow="base"
          >
            <Heading fontSize="xl" px="6" py="4">
              Update Profile
            </Heading>
            <Divider />
            <UpdateAccountForm user={props.user} />
          </Box>
          <UpdateEmailPassword />
        </Box>
      </ChakraProvider>
    </div>
  );
}
