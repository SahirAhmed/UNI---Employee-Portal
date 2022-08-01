import Announcement from "../components/Announcement";
import {
  Heading,
  Box,
  Divider,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon } from "@chakra-ui/icons"

export default function LatestAnnouncement({ announcements, user }) {
  // If no announcements have been made yet.
  if (announcements.length === 0) {
    return (
      <Box
        bg="white"
        boxShadow="base"
        maxW="container.lg"
        margin="auto"
        rounded="lg"
      >
        <Heading
          px={8}
          py={6}
          fontSize="2xl"
        >
          Latest Announcement
        </Heading>
        <Divider />
        <Box
          px={24}
          py={12}
          textAlign="center"
        >
          <ChatIcon w="40" h="40" mb="6" color="gray.300"/>
          <Text fontSize="xl" color="gray.600">No announcements exist</Text>
        </Box>
      </Box>
    );
  }

  return (
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
          Latest Announcement
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
      <Box
        px={8}
        py={6}
      >
        <Announcement announcement={announcements[0]} user={user} />
      </Box>
    </Box>
  );
}
