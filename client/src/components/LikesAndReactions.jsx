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

export default class LikesAndReactions extends Component {
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
      pageLikes: [],
      otherLikes: [],
      reactions: []
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
            Likes and Reactions
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
          Likes And Reactions
        </Header>
        <Container text>
          <Header size="large" textAlign="center">
            Pages You Like
          </Header>
          <Feed size="large">
            {this.state.pageLikes.map(page => {
              let date = page.timestamp * 1000;
              return (
                <Feed.Event key={page.name + page.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      You liked <Feed.User>{page.name}</Feed.User>
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
            Likes On External Sites
          </Header>
          <Feed size="large">
            {this.state.otherLikes.map(page => {
              let date = page.timestamp * 1000;
              return (
                <Feed.Event key={page.title + page.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      {page.title}
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
            Your Reactions
          </Header>
          <Feed size="large">
            {this.state.reactions.map(reaction => {
              let date = reaction.timestamp * 1000;
              return (
                <Feed.Event key={reaction.title + reaction.timestamp}>
                  <Feed.Content>
                    <Feed.Summary>
                      {reaction.title}
                      <Feed.Date>
                        {moment(date).format("MMM Do YYYY")}
                      </Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                      <Feed.Like>
                        {reaction.data[0].reaction.reaction}
                      </Feed.Like>
                    </Feed.Meta>
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
    let pageLikes = await userSession.getFile("likes_and_reactions/pages.json");
    let otherLikes = await userSession.getFile(
      "likes_and_reactions/likes_on_external_sites.json"
    );
    let reactions = await userSession.getFile(
      "likes_and_reactions/posts_and_comments.json"
    );

    if (pageLikes !== null) {
      pageLikes = JSON.parse(pageLikes);
      pageLikes = pageLikes.page_likes;
    }
    if (otherLikes !== null) {
      otherLikes = JSON.parse(otherLikes);
      otherLikes = otherLikes.other_likes;
    }
    if (reactions !== null) {
      reactions = JSON.parse(reactions);
      reactions = reactions.reactions;
    }
    this.setState({
      pageLikes: pageLikes || [],
      otherLikes: otherLikes || [],
      reactions: reactions || [],
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
