// shows user information based on who is logged in
import { Heading, VStack, StackDivider, Box, Divider } from "@chakra-ui/react";

export default function UserStatus(props) {
  // if logged in
  if (props.user) {
    return <LoggedInStatus user={props.user} />;
  } else {
    return <LoggedOutStatus />;
  }
}

export function LoggedInStatus(props) {
  // showing various user info if logged in
  return (
    <Box bg="white" mx="auto" rounded="lg" boxShadow="base" px="6" py="4">
      <Heading fontSize="xl" px="15" py="4">
        Your Information
      </Heading>
      <Divider />
      <VStack minW="20vw" px={8} py={6} divider={<StackDivider />} spacing={6}>
        <Box w="110%">
          <p>
            <strong>Email: </strong>
            {props.user.email}
          </p>
          <p>
            <strong>First Name: </strong>
            {props.user.firstName}
          </p>
          <p>
            <strong>Last Name: </strong>
            {props.user.lastName}
          </p>
          <p>
            <strong>Phone: </strong>
            {props.user.phone}
          </p>
          <p>
            <strong>Address: </strong>
            {props.user.address}
          </p>
          <p>
            <strong>Office: </strong>
            {props.user.office}
          </p>
          <p>
            <strong>Department Number: </strong>
            {props.user.deptNum}
          </p>
          <p>
            <strong>Role: </strong>
            {props.user.role}
          </p>
        </Box>
      </VStack>
    </Box>
  );
}

// showing nobody is signed in
export function LoggedOutStatus() {
  return <p>No one is signed in...</p>;
}
