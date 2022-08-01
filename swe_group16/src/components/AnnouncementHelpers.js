import React from "react";
import styled from "styled-components";

// form and logic for making an announcement
// this form is structured as a controlled component
// as normal html form elements maintain their own state based on user input
// whereas here state should only change using setState
// (single source of truth)
export class MakeAnnouncement extends React.Component {
  // constructor and state for announcement content
  constructor(props) {
    // variable for users name (author name to be stored)
    // let name = this.props.user.
    super(props);
    this.state = {
      // author: name.toString(),
      title: "Announcement Title",
      body: "Announcement Body",
    };

    // binding to retain context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // changing state to reflect text boxes
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // onSubmit state management
  handleSubmit(event) {
    event.preventDefault();
    let name = this.props.user.firstName + " " + this.props.user.lastName;
    this.props.onClick(name, this.state.title, this.state.body);
  }

  render() {
    // if not logged in
    if (!this.props.user) return null;
    // perms check - if not a manager/hrmanager
    if (
      this.props.user.role !== "Manager" &&
      this.props.user.role !== "HR Manager"
    ) {
      return null;
    }
    // otherwise must be correct role
    // so render out make announcement form
    return (
      <NewAnn>
        <MainTitle>Make New Announcement</MainTitle>
        <form onSubmit={this.handleSubmit}>
          <MakeAnnT
            name="title"
            type="text"
            placeholder="Announcement Title"
            onChange={this.handleChange}
            pattern="((?!^ +$)^.+$)" // Must be at least 2 characters long, acceptable characters being A-z, 0-9 and \s (space).
            title="Title must be at least two characters and only from the following: A-z and 0-9."
            required
          />
          <MakeAnnB
            name="body"
            type="text"
            placeholder="Announcement Body"
            onChange={this.handleChange}
            pattern="((?!^ +$)^.+$)" // Must be at least 2 characters long, acceptable characters being A-z, 0-9 and \s (space).
            title="Body must be at least two characters and only from the following: A-z and 0-9."
            required
          />
          <SubmitAnn type="submit" value="Make Announcement" />
          <ResetAnn type="reset" value="Clear Form" />
        </form>
      </NewAnn>
    );
  }
}

// implement styles here
const NewAnn = styled.div`
  background-color: #3182ce;
  border: solid #4182f2;
  border-radius: 0.5em;
  margin: 1em auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const MainTitle = styled.h1`
  font-weight: 500;
  font-size: 1.5em;
  text-align: center;
  margin: 0.5em auto;
  color: white;
`;

const MakeAnnT = styled.input`
  display: block;
  text-align: center;
  margin: 1em auto;
  width: 55vw;
  padding: 0.5em;
  border-radius: 0.5em;
`;

const MakeAnnB = styled.textarea`
  display: block;
  text-align: center;
  margin: 1em auto;
  width: 55vw;
  height: 10vh;
  resize: vertical;
  overflow: auto;
  padding: 0.5em;
  border-radius: 0.5em;
`;

const SubmitAnn = styled.input`
  display: block;
  text-align: center;
  margin: 1em auto;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  &:hover {
    background-color: lightgrey;
  }
`;

const ResetAnn = styled.input`
  display: block;
  text-align: center;
  margin: 1em auto;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  &:hover {
    background-color: lightgrey;
  }
`;
