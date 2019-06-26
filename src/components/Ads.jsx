import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Icon,
  Container,
  List,
  Header
} from "semantic-ui-react";

export default class Ads extends Component {
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
      isLoading: false,
      topics: [],
      customAudiences: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    return (
      <div>
        <Header size="huge" textAlign="center">
          Advertising
        </Header>
        <Container text>
          <Header size="medium" textAlign="center">
            Topics of Interest
          </Header>
          <List>
            {this.state.topics.map(topic => (
              <List.Item key={topic}>{topic}</List.Item>
            ))}
          </List>
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let topics = await userSession.getFile("ads/ads_interests.json", options);
    let customAudiences = await userSession.getFile(
      "ads/advertisers_who_uploaded_a_contact_list_with_your_information.json"
    );
    if (topics !== null) {
      topics = JSON.parse(topics);
      topics = topics.topics;
    }
    if (customAudiences !== null) {
      customAudiences = JSON.parse(customAudiences);
      customAudiences = customAudiences.custom_audiences;
    }

    this.setState({
      customAudiences: customAudiences || [],
      topics: topics || [],
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
