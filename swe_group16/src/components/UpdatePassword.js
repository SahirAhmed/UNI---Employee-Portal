import { useState } from 'react';
import { Text, Box, FormHelperText, FormControl, FormLabel, Input, Button, useToast, FormErrorMessage } from '@chakra-ui/react';
import firebase from 'firebase/app';

export default function UpdatePassword({ user }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const toast = useToast();
  const samePassword = (formData.currentPassword === formData.newPassword && formData.currentPassword !== "");

  function handleChange(e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      formData.currentPassword
    );

    user.reauthenticateWithCredential(credential)
    .then(updatePassword)
    .then(updateSuccessful)
    .catch(updateError)
    .finally(() => setIsUpdating(false));
  }

  function updatePassword() {
    return user.updatePassword(formData.newPassword);
  }

  function updateSuccessful() {
    toast.closeAll();
    toast({
      title: "Password updated",
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
      <Box>
        <Text
          fontSize="lg"
          fontWeight="bold"
          mb="2">Update Password:</Text>
        <form onSubmit={handleSubmit}>
          <FormControl
            isDisabled={isUpdating}
            isRequired
            mb="4">
            <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
            <Input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              onChange={handleChange}
              value={formData.currentPassword}
            />
            <FormHelperText>We need your current password to update your password.</FormHelperText>
            <FormErrorMessage>Error with current password...</FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={isUpdating}
            isInvalid={samePassword}
            isRequired
            mb="4">
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <Input
              type="password"
              name="newPassword"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
              placeholder="New Password"
              onChange={handleChange}
              value={formData.newPassword}
            />
            <FormErrorMessage>Please enter a new password.</FormErrorMessage>
          </FormControl>
          <Button
            isDisabled={samePassword}
            type="submit"
            colorScheme="blue"
            isLoading={isUpdating}>
              Update Password
          </Button>
        </form>
      </Box>
  );
}
