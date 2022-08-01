// shows user information based on who is logged in
import {
  Heading,
  VStack,
  StackDivider,
  Box,
  Divider,
  Stack,
  Link,
} from "@chakra-ui/react";
import CodeOfConduct from "../assets/Code-of-Conduct.pdf";
import Brochure from "../assets/Brochure.pdf";
import RRC from "../assets/Risk-Regulation-Compliance.pdf";

export default function Resources() {
  // showing various user info if logged in
  return (
    <Box
      bg="white"
      // maxWidth={["80vw", "80vw", "15.5vw", "15.5vw"]}
      mx="auto"
      rounded="lg"
      boxShadow="base"
      px="6"
      py="4"
    >
      <Heading fontSize="xl" px="15" py="4">
        Resources
      </Heading>
      <Divider />

      <VStack px={8} py={6} divider={<StackDivider />} spacing={6}>
        <Box w="110%">
          <Stack>
            <Link
              isExternal="true"
              href={CodeOfConduct}
              textDecoration="underline"
            >
              Code of Conduct
            </Link>

            <Link isExternal="true" href={RRC} textDecoration="underline">
              Risk, Regulation and Compliance
            </Link>
            <Link isExternal="true" href={Brochure} textDecoration="underline">
              2020 Brochure
            </Link>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
}
