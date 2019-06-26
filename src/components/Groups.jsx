import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
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

export default class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
        avatarUrl() {
          return avatarFallbackImage;
        }
      },
      username: "",

      isLoading: false,
      groupsAdmined: [],
      groupsJoined: []
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
            Groups
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
        <Header size="huge" textAlign="center">
          Groups
        </Header>
        <Container text>
          <Header size="large" textAlign="center">
            Groups Where You're An Admin
          </Header>
          <Feed size="large">
            {this.state.groupsAdmined.map(group => {
              let date = group.timestamp * 1000;
              return (
                <Feed.Event key={group.name + group.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      You became an admin of <Feed.User>{group.name}</Feed.User>
                      <Feed.Date>
                        {moment(date).format("MMM Do YYYY")}
                      </Feed.Date>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              );
            })}
          </Feed>
          <Header size="large" textAlign="center">
            Groups You Joined
          </Header>
          <Feed size="large">
            {this.state.groupsJoined.map(group => {
              let date = group.timestamp * 1000;
              return (
                <Feed.Event key={group.title + group.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      You joined{" "}
                      <Feed.User>{group.attachments[0].data[0].name}</Feed.User>
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
    let groupsAdmined = await userSession.getFile("groups/your_groups.json");
    let groupsJoined = await userSession.getFile(
      "groups/your_group_membership_activity.json"
    );

    if (groupsAdmined !== null) {
      groupsAdmined = JSON.parse(groupsAdmined);
      groupsAdmined = groupsAdmined.groups_admined;
    }
    if (groupsJoined !== null) {
      groupsJoined = JSON.parse(groupsJoined);
      groupsJoined = groupsJoined.groups_joined;
    }
    this.setState({
      groupsAdmined: groupsAdmined || [],
      groupsJoined: groupsJoined || [],
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
