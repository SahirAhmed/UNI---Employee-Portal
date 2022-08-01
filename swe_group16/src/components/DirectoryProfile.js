import { VStack, Text, Tag, HStack, Stack } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";

export default function DirectoryProfile({ user }) {
  return (
    <VStack spacing={2} alignItems="flex-start">
      <Stack
        spacing={["2", "4"]}
        flexWrap="wrap"
        direction={["column", "row"]}
        alignItems={["flex-start", "center"]}
      >
        <Text fontWeight="bold" fontSize="xl">
          {user.firstName} {user.lastName}
        </Text>
        <Tag colorScheme="blue" variant="solid" size="sm">
          {user.role}
        </Tag>
      </Stack>
      <Stack
        direction={["column", "row"]}
        spacing={["2", "12"]}
        flexWrap="wrap"
      >
        <HStack alignItems="center" spacing={2}>
          <PhoneIcon color="gray.400" />
          <Text color="gray.600">{user.phone}</Text>
        </HStack>
        <HStack alignItems="center" spacing={2}>
          <EmailIcon color="gray.400" />
          <Text color="gray.600">{user.email}</Text>
        </HStack>
        <HStack alignItems="center" spacing={2}>
          <Text color="gray.600">Office:</Text>
          <Text color="gray.600" fontWeight="semibold">
            {user.office}
          </Text>
        </HStack>
        <HStack alignItems="center" spacing={2}>
          <Text color="gray.600">Department Number:</Text>
          <Text color="gray.600" fontWeight="semibold">
            {user.deptNum}
          </Text>
        </HStack>
      </Stack>
    </VStack>
  );
}
