import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx.js";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Icon,
  Container,
  Grid,
  Menu,
  Dimmer,
  Loader,
  Image,
  Label,
  Card,
  Input,
  Feed,
  Header
} from "semantic-ui-react";

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
          
      },
      username: "",

      isLoading: false,

      friends: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Header size="huge" textAlign="center">
            Friends
          </Header>
          <Container text>
            <Dimmer inverted active>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
              style={{ margin: "50px 0" }}
            />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Container>
        </div>
      );
    }
    return (
      <div>
        <Header textAlign="center">Friends</Header>
        <Container text>
          <Feed size="large">
            {this.state.friends.map(friend => {
              let date = friend.timestamp * 1000;
              return (
                <Feed.Event key={friend.name + friend.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>{friend.name}</Feed.User> became friends with
                      you
                      <Feed.Date>
                        {moment(date).format("MMM Do YYYY")}
                      </Feed.Date>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              );
            })}
          </Feed>
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let file = await userSession.getFile("friends/friends.json");
    let data;
    if (file !== null) {
      data = JSON.parse(file);
    }
    this.setState({
      friends: data.friends || [],
      isLoading: false
    });
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
      username: userSession.loadUserData().username
    });
  }
}
