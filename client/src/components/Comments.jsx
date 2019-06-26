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

export default class Comments extends Component {
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
      comments: []
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
            Comments
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
        <Header textAlign="center">Comments</Header>
        <Container text>
          <Feed size="large">
            {this.state.comments.map((comment, i) => {
              let date = comment.timestamp * 1000;
              return (
                <Feed.Event
                  style={{ marginTop: "20px" }}
                  key={comment.timestamp + comment.data[0].comment.comment + i}
                >
                  <Feed.Content>
                    <Feed.Summary>
                      {comment.title}
                      <Feed.Date>
                        {moment(date).format("MMM Do YYYY")}
                      </Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      {comment.data[0].comment.comment}
                    </Feed.Extra>
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
    let comments = await userSession.getFile("comments/comments.json");
    if (comments !== null) {
      comments = JSON.parse(comments);
      comments = comments.comments;
    }
    this.setState({
      comments: comments || [],
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
