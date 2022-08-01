import styled from "styled-components";
import React from "react";

// components import
import HeaderBar from "../components/HeaderBar";
import SignInForm from "../components/SignInForm";
import background from "../assets/IndexFDM.png";

// login - when signed out, the only page which can be accessed

export default class Login extends React.Component {
  render() {
    return (
      <>
        <LoginWrap>
          <HeaderBar />
          <SignInForm {...this.state} />
        </LoginWrap>
      </>
    );
  }
}

const LoginWrap = styled.div`
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${background});
`;
