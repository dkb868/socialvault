import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Icon,
  Dimmer,
  Loader,
  Container,
  Grid,
  Menu,
  Image,
  Label,
  Card,
  Input,
  Placeholder,
  Feed,
  Header,
  Divider
} from "semantic-ui-react";

export default class YourPosts extends Component {
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
      posts: []
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
            Other People's Posts To Your Timeline
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
          Other People's Posts To Your Timeline
        </Header>
        <Container text>
          <Feed size="large">
            {this.state.posts.map((post, i) => {
              let date = post.timestamp * 1000;
              return post.data && post.data.length && post.data[0].post ? (
                <div key={i}>
                  <Feed.Event style={{ marginTop: "20px" }}>
                    <Feed.Content>
                      <Feed.Date>
                        {moment(date).format("MMM Do YYYY")}
                      </Feed.Date>
                      <Feed.Summary>{post.title}</Feed.Summary>
                      <Feed.Extra text>{post.data[0].post}</Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                  <Divider />
                </div>
              ) : null;
            })}
          </Feed>
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let posts = await userSession.getFile(
      "posts/other_people's_posts_to_your_timeline.json"
    );

    if (posts !== null) {
      posts = JSON.parse(posts);
      posts = posts.wall_posts_sent_to_you.activity_log_data;
    }

    this.setState({
      posts: posts || [],
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
