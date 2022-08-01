import React from "react";
import { auth, db } from "./firebase";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import {
  ChakraProvider,
  Text,
  Center,
  Spinner,
  VStack,
} from "@chakra-ui/react";

// pages imports
import Login from "./Pages/Login";
import Announcements from "./Pages/Announcements";
import Home from "./Pages/Home";
import EmployeeDirectory from "./Pages/EmployeeDirectory";
import Admin from "./Pages/Admin";
import UpdateAccount from "./Pages/UpdateAccount";

// main component which holds the state of the user when logged in
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // state for user info/announcement storage
    this.state = {
      loadingUser: true,
      user: null,
      announcements: [],
      users: [],
    };
    // bind to retain context
    this.authStateChanged = this.authStateChanged.bind(this);
    this.getAnnouncements = this.getAnnouncements.bind(this);
    this.getUsers = this.getUsers.bind(this);
    // this.resetEmailButtonClick = this.resetEmailButtonClick.bind(this);
    auth.onAuthStateChanged(this.authStateChanged);
    // calling announcements doc
    db.collection("announcements")
      .orderBy("timestamp", "desc")
      .onSnapshot(this.getAnnouncements);
    db.collection("users")
      .orderBy("lastName", "desc")
      .onSnapshot(this.getUsers);
  }

  // this function is called when the user logs in/out.
  authStateChanged(newUser) {
    if (newUser) {
      // user is logged in.
      // get the firstname, lastname and role from firestore using user id.
      db.collection("users")
        .doc(newUser.uid)
        .onSnapshot((doc) => {
          let firstName = doc.get("firstName");
          let lastName = doc.get("lastName");
          let phone = doc.get("phone");
          let office = doc.get("office");
          let address = doc.get("address");
          let deptNum = doc.get("deptNum");
          let role = doc.get("role");
          // setting state
          this.setState({
            user: {
              id: newUser.uid,
              email: newUser.email,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              office: office,
              address: address,
              deptNum: deptNum,
              role: role,
            },
            loadingUser: false,
          });
        });
    } else {
      // user is logged out.
      this.setState({
        user: null,
        loadingUser: false,
      });
    }
  }

  // initial get for announcements
  getAnnouncements(querySnapshot) {
    let announcements = [];
    querySnapshot.forEach((doc) => {
      let title = doc.get("title");
      let body = doc.get("body");
      let authorID = doc.get("authorID");
      let author = doc.get("author");
      let timestamp = doc.get("timestamp");
      timestamp = timestamp ? timestamp.toDate().toLocaleDateString() : "";

      let announcement = {
        id: doc.id,
        title: title,
        body: body,
        timestamp: timestamp,
        authorID: authorID,
        author: author,
      };
      announcements.push(announcement);
    });
    this.setState({
      announcements: announcements,
    });
  }

  getUsers(querySnapshot) {
    let users = [];
    querySnapshot.forEach((doc) => {
      let email = doc.get("email");
      let firstName = doc.get("firstName");
      let lastName = doc.get("lastName");
      let phone = doc.get("phone");
      let office = doc.get("office");
      let address = doc.get("address");
      let deptNum = doc.get("deptNum");
      let role = doc.get("role");

      let user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        office: office,
        address: address,
        deptNum: deptNum,
        role: role,
      };
      users.push(user);
    });
    this.setState({
      users: users,
    });
    // console.log(this.state)
  }

  render() {
    // The auth state listener hasn't been called yet.
    // We don't know if the user is logged in or logged out.
    if (this.state.loadingUser) {
      return (
        <ChakraProvider>
          <Center bg="gray.100" w="100vw" h="100vh">
            <VStack p={12} spacing={8}>
              <Spinner
                size="xl"
                color="blue.600"
                thickness="4px"
                emptyColor="gray.300"
              />
              <Text color="gray.700">Loading</Text>
            </VStack>
          </Center>
        </ChakraProvider>
      );
    }

    // user is logged in
    // using react router to setup all the routes to different page components
    // as well as passing state
    if (this.state.user) {
      return (
        <Router>
          <Switch>
            <Route path="/home">
              <Home {...this.state} />
            </Route>
            <Route path="/announcements">
              <Announcements {...this.state} />
            </Route>
            <Route path="/directory">
              <EmployeeDirectory {...this.state} />
            </Route>
            <Route path="/admin">
              <Admin {...this.state} />
            </Route>
            <Route path="/profile">
              <UpdateAccount {...this.state} />
            </Route>
            <Redirect from="/login" to="/home" />
            <Redirect from="*" to="/home" />
          </Switch>
        </Router>
      );
    }
    // no user found
    if (!this.state.user) {
      // await new Promise(r => setTimeout(r, 2000));
      return (
        <Router>
          <Route path="/">
            <Login {...this.state} />
          </Route>
          {/* <Redirect from="*" to="/" /> */}
        </Router>
      );
    }
    return null;
  }
}
