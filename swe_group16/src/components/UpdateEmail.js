import { useState } from "react";
import {
  Text,
  Box,
  FormHelperText,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import { useFirestore } from "reactfire";

export default function UpdateEmail({ user }) {
  const userRef = useFirestore().collection("users").doc(user.uid);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailSame = formData.email === user.email;

  function handleChange(e) {
    updateFormData(e.target.name, e.target.value);
  }

  function updateFormData(key, value) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [key]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      formData.password
    );

    user
      .reauthenticateWithCredential(credential)
      .then(updateAuthEmail)
      .then(updateFirestoreEmail)
      .then(updateSuccessful)
      .catch(updateError)
      .finally(() => setIsUpdating(false));
  }

  function updateAuthEmail() {
    return user.updateEmail(formData.email);
  }

  function updateFirestoreEmail() {
    return userRef.update({
      email: formData.email,
    });
  }

  function updateSuccessful() {
    toast.closeAll();
    toast({
      title: "Email updated",
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
      <Text fontSize="lg" fontWeight="bold" mb="2">
        Update Email:
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl
          isDisabled={isUpdating}
          isInvalid={emailSame}
          isRequired
          mb="4"
        >
          <FormLabel htmlFor="email">New Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder={user.email}
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>Please enter a new email address.</FormErrorMessage>
        </FormControl>
        <FormControl isDisabled={isUpdating} isRequired mb="4">
          <FormLabel htmlFor="email">Current Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <FormHelperText>
            We need your current password to update your email.
          </FormHelperText>
          <FormErrorMessage>Error with email...</FormErrorMessage>
        </FormControl>
        <Button
          isDisabled={emailSame}
          type="submit"
          colorScheme="blue"
          isLoading={isUpdating}
        >
          Update Email
        </Button>
      </form>
    </Box>
  );
}
