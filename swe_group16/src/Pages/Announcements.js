import React from "react";
import firebase from "firebase/app";
import { db } from "../firebase";
import styled from "styled-components";

// components import
import Navbar from "../components/Navbar";
import { MakeAnnouncement } from "../components/AnnouncementHelpers";
import ViewAnnouncements from "../components/ViewAnnouncements";

// announcements page - accessible by all upon login
export default class Announcements extends React.Component {
  // rendered:
  // Navbar
  // All announcements via ViewAnnouncements func from AnnouncementHelpers
  makeAnnouncementClick(author, title, body) {
    if (!this.props.user) return;
    db.collection("announcements").add({
      title: title,
      body: body,
      author: author,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      authorID: this.props.user.id,
    });
  }

  render() {
    return (
      <Container>
        <Navbar {...this.props} />
        {/* <UserStatus {...this.props}/> */}

        <InnerContainer>
          <MakeAnnouncement
            user={this.props.user}
            onClick={(author, title, body) =>
              this.makeAnnouncementClick(author, title, body)
            }
          />
        </InnerContainer>
        <ViewAnnouncements {...this.props} />
      </Container>
    );
  }
}

const Container = styled.div`
  overflow-x: hidden;
  max-width: 100vw;
  height: 100%;
  padding-bottom: 1em;
  background-color: #edf2f7;
`;

const InnerContainer = styled.div`
  padding: 1em;
  margin: auto;
  max-width: 60vw;
  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;
