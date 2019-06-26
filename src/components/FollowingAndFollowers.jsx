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
  Dimmer,
  Loader,
  Menu,
  Image,
  Label,
  Card,
  Input,
  Feed,
  Header
} from "semantic-ui-react";

export default class FollowingAndFollowers extends Component {
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
      following: [],
      pagesUnfollowed: []
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
            Following and Followers
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
          Following and Followers
        </Header>
        <Container text>
          <Header size="large" textAlign="center">
            People You Follow
          </Header>
          <Feed size="large">
            {this.state.following.map(person => {
              let date = person.timestamp * 1000;
              return (
                <Feed.Event key={person.name + person.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      You followed <Feed.User>{person.name}</Feed.User>
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
            Pages You Unfollowed
          </Header>
          <Feed size="large">
            {this.state.pagesUnfollowed.map(page => {
              let date = page.timestamp * 1000;
              return (
                <Feed.Event key={page.title + page.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      You unfollowed <Feed.User>{page.title}</Feed.User>
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
    let following = await userSession.getFile(
      "following_and_followers/following.json"
    );
    let pagesUnfollowed = await userSession.getFile(
      "following_and_followers/unfollowed_pages.json"
    );

    if (following !== null) {
      following = JSON.parse(following);
      following = following.following;
    }
    if (pagesUnfollowed !== null) {
      pagesUnfollowed = JSON.parse(pagesUnfollowed);
      pagesUnfollowed = pagesUnfollowed.pages_unfollowed;
    }
    this.setState({
      following: following || [],
      pagesUnfollowed: pagesUnfollowed || [],
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
