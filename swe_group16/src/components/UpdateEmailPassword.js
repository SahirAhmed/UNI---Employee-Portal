import UpdateEmail from "../components/UpdateEmail";
import UpdatePassword from "../components/UpdatePassword";
import { Heading, VStack, Box, Divider, StackDivider } from "@chakra-ui/react";
import { useUser } from "reactfire";

export default function UpdateEmailPassword() {
  const { data: user } = useUser(undefined, { initialData: {} });

  if (!user) return null;

  return (
    <Box
      bg="white"
      mx="auto"
      maxW="container.lg"
      rounded="lg"
      boxShadow="base"
      mt="12"
    >
      <Heading fontSize="xl" px="6" py="4">
        Account Security
      </Heading>
      <Divider />
      <VStack px={8} py={6} divider={<StackDivider />} spacing={6}>
        <UpdateEmail user={user} />
        <UpdatePassword user={user} />
      </VStack>
    </Box>
  );
}
