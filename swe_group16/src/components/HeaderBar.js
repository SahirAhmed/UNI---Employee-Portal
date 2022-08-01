import logo from '../assets/logowhite.png';
import styled from 'styled-components';

// Header bar for login page

export default function HeaderBar() {
    return (
        <HeadingBar>
            <Logo />
        </HeadingBar>
    );
}

// styles
const HeadingBar = styled.div`
  width: 100%;
  height: 8vh;
  text-align: center;
  margin: 0;
  padding-top: 1vh;
`;

const Logo = styled.div`
  margin: auto;
  padding: auto;
  max-width: 11vh;
  height: 5.3vh;
  background-image: url(${logo});
  background-size: cover;
`;
