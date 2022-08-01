import Announcement from "../components/Announcement";
import {
  Heading,
  Box,
  Divider,
  VStack,
  StackDivider,
  Flex,
  Button,
  Text,
  ChakraProvider,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon } from "@chakra-ui/icons"

export default function ViewAnnouncements({ announcements, user }) {
  let annList = announcements.map(ann => <Announcement key={ann.id} announcement={ann} user={user} />);

  // If no announcements have been made yet.
  if (annList.length === 0) {
    annList = (
      <Box textAlign="center" py="6">
        <ChatIcon w="40" h="40" mb="6" color="gray.300"/>
        <Text fontSize="xl" color="gray.600">No announcements exist</Text>
      </Box>
    );
  }

  return (
    <ChakraProvider>
    <Box pt="6">
      <Box
        bg="white"
        boxShadow="base"
        maxW="container.lg"
        margin="auto"
        rounded="lg"
      >
      <Flex
        px={8}
        py={6}
        alignItems="center"
      >
        <Heading
          fontSize="2xl"
          flex="1"
        >
          Announcements
        </Heading>
        <Button
          display="none"
          colorScheme="blue"
          leftIcon={<AddIcon />}
        >
          Add
        </Button>
        </Flex>
        <Divider />
        <VStack
          px={8}
          py={6}
          divider={<StackDivider />}
          spacing={6}
        >
          {annList}
        </VStack>
      </Box>
    </Box>
    </ChakraProvider>
  );
}
