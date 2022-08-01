import styled from "styled-components";
import React, { useState } from "react";
import { auth } from "../firebase";
import { createStandaloneToast } from "@chakra-ui/react";

// Basic Sign in component that is displayed on the login page
// App.js routing ensures that if a user visits this page when they are already
// signed in they are redirected to the homepage.
export default function SignInForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = createStandaloneToast();

  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    auth.signInWithEmailAndPassword(email, password).catch(signInError);
  }

  function signInError(error) {
    toast.closeAll();
    toast({
      title: error.code,
      description: error.message,
      status: "error",
      position: "top-right",
      isClosable: true,
    });
    setIsDisabled(false);
  }

  return (
    <LoginWrap>
      <LoginBox>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <Credentials>
            <Email
              required
              type="email"
              value={email}
              placeholder="Email"
              disabled={isDisabled}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              required
              type="password"
              value={password}
              placeholder="Password"
              disabled={isDisabled}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Credentials>
          <SignInButton type="submit" disabled={isDisabled}>
            {isDisabled ? "Signing In" : "Sign In"}
          </SignInButton>
        </form>
      </LoginBox>
    </LoginWrap>
  );
}

// styles
const LoginWrap = styled.div`
  padding-top: 20vh;
  display: table;
  margin: 0 auto;
`;

const LoginBox = styled.div`
  text-align: center;
  padding: 2vw;
  border-radius: 1em;
  background-color: rgba(247, 247, 247, 0.3);
  border: 2px solid rgba(145, 145, 145, 0.7);
  color: white;
`;

const Credentials = styled.div``;

const SignInButton = styled.button`
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  padding: 6px 24px;
  &: hover {
    background-color: #f1f1f1;
  }
`;

const Email = styled.input`
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  &: hover {
    background-color: #f1f1f1;
  }
`;

const Password = styled.input`
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  margin-top: 1.5em;
  margin-bottom: 3em;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  &: hover {
    background-color: #f1f1f1;
  }
`;
