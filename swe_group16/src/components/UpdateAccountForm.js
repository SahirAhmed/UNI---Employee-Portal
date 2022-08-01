import { Box, FormControl, FormLabel, Input, Button, useToast, FormErrorMessage } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useFirestore } from 'reactfire';

export default function UpdateAccountForm(props) {
  const userRef = useFirestore().collection('users').doc(props.user.id);
  const [user, setUser] = useState(props.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  function handleChange(e) {
    setUser(prevUser => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);
    userRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
    })
    .then(updateSuccessful)
    .catch(updateError)
    .finally(() => setIsUpdating(false));
  }

  function updateSuccessful() {
    toast.closeAll();
    toast({
      title: "Profile updated",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  }

  function updateError(error) {
    toast.closeAll();
    toast({
      title: error.code,
      description: error.message,
      status: "error",
      position: "top-right",
      isClosable: true,
    });
  }

  return (
      <Box
        px="6"
        py="4"
      >
        <form onSubmit={handleSubmit}>
          <FormControl
            isDisabled={isUpdating}
            isRequired
            mb="4">
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              value={user.firstName}
              onChange={handleChange}
            />
            <FormErrorMessage>Error with first name...</FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={isUpdating}
            isRequired
            mb="4">
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={user.lastName}
              onChange={handleChange}
            />
            <FormErrorMessage>Error with last name...</FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={isUpdating}
            isRequired
            mb="4">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
            />
            <FormErrorMessage>Error with address...</FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={isUpdating}
            isRequired
            mb="4">
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleChange}
              pattern="((\+44\s?\(0\)\s?\d{2,4})|(\+44\s?(01|02|03|07|08)\d{2,3})|(\+44\s?(1|2|3|7|8)\d{2,3})|(\(\+44\)\s?\d{3,4})|(\(\d{5}\))|((01|02|03|07|08)\d{2,3})|(\d{5}))(\s|-|.)(((\d{3,4})(\s|-)(\d{3,4}))|((\d{6,7})))"
            />
            <FormErrorMessage>Error with phone number...</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isUpdating}>
              Update
          </Button>
        </form>
      </Box>
  );
}
