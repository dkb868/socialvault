import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx.js";
import { Link } from "react-router-dom";
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

export default class SearchHistory extends Component {
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
      searches: []
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
            Search History
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
          Search History
        </Header>
        <Container text>
          <Header size="medium" textAlign="center">
            Your Search History
          </Header>
          <Feed size="large">
            {this.state.searches.map((search, i) => {
              let date = search.timestamp * 1000;
              return (
                <Feed.Event key={search.title + search.timestamp + i}>
                  <Feed.Content>
                    <Feed.Summary>
                      You searched for{" "}
                      <Feed.User>{search.data[0].text}</Feed.User>
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
    let searches = await userSession.getFile(
      "search_history/your_search_history.json"
    );

    if (searches !== null) {
      searches = JSON.parse(searches);
      searches = searches.searches;
    }

    this.setState({
      searches: searches || [],
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
