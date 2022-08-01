import React, { useState } from "react";
import { adminAuth, db } from "../firebase";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast
} from "@chakra-ui/react";

export default function CreateUserForm() {
  const toast = useToast();
  const [formDisabled, setFormDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(initFormData);

  function initFormData() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      office: "",
      address: "",
      deptNum: "",
      role: "",
    };
  }

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
    setFormDisabled(true);

    adminAuth
    .createUserWithEmailAndPassword(formData.email, password)
    .then(createUserDBEntry)
    .then(createSuccess)
    .catch(createError)
    .finally(() => setFormDisabled(false));
  }

  function createUserDBEntry(userCredential) {
    const userID = userCredential.user.uid;
    return db.collection("users").doc(userID).set(formData);
  }

  function createSuccess() {
    toast.closeAll();
    toast({
      title: "User created",
      status: "success",
      position: "top-right",
      isClosable: true,
    });

    // Clear the form
    setFormData(initFormData);
    setPassword("");
  }

  function createError(error) {
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
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} alignItems="flex-start">
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              pattern="[A-Za-z]+$"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              pattern="[A-Za-z]+$"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="phone">
              Phone Number
            </FormLabel>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="((\+44\s?\(0\)\s?\d{2,4})|(\+44\s?(01|02|03|07|08)\d{2,3})|(\+44\s?(1|2|3|7|8)\d{2,3})|(\(\+44\)\s?\d{3,4})|(\(\d{5}\))|((01|02|03|07|08)\d{2,3})|(\d{5}))(\s|-|.)(((\d{3,4})(\s|-)(\d{3,4}))|((\d{6,7})))"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel type="text" htmlFor="office">
              Office
            </FormLabel>
            <Select
              placeholder="Select an office"
              color="grey"
              name="office"
              value={formData.office}
              onChange={handleChange}
            >
              <option value="Birmingham">Birmingham</option>
              <option value="Brighton">Brighton</option>
              <option value="London">London</option>
              <option value="Remote">Remote</option>
              <option value="Sydney">Sydney</option>
            </Select>
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
              placeholder="Select a role"
              color="grey"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
            <option value="Employee">Employee</option>
            <option value="Admin">System Administrator</option>
            <option value="Manager">Manager</option>
            <option value="HR Manager">HR Manager</option>
            </Select>
          </FormControl>
          <FormControl isRequired isDisabled={formDisabled}>
            <FormLabel htmlFor="deptNum">Department Number</FormLabel>
            <Input
              type="number"
              name="deptNum"
              placeholder="Department No."
              value={formData.deptNum}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={formDisabled}>
            Create User
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
