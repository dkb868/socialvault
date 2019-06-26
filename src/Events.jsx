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
  Header,
  Divider
} from "semantic-ui-react";

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
          
      },
      isLoading: false,
      yourEvents: [],
      eventsJoined: [],
      eventsInvited: []
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
            Events
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
          Events
        </Header>

        <Container>
          <Header size="large" textAlign="center">
            Events You Hosted
          </Header>
          {this.state.yourEvents.map((event, i) => {
            let startTime = event.start_timestamp * 1000;
            let endTime = event.end_timestamp * 1000;

            return (
              <Card key={event.name + i} fluid>
                <Card.Content>
                  <Card.Header>{event.name}</Card.Header>
                  <Card.Meta>
                    {" "}
                    {moment(startTime).format("MMM Do YYYY")} -{" "}
                    {moment(endTime).format("MMM Do YYYY")}
                  </Card.Meta>
                  <Card.Meta>{event.place.name}</Card.Meta>
                  <Card.Description>{event.description}</Card.Description>
                </Card.Content>
              </Card>
            );
          })}
          <Divider />
          <Header size="large" textAlign="center" style={{ marginTop: "50px" }}>
            Events You Joined
          </Header>
          <Card.Group centered>
            {this.state.eventsJoined.map((event, i) => {
              let startTime = event.start_timestamp * 1000;
              let endTime = event.end_timestamp * 1000;

              return (
                <Card key={event.name + i}>
                  <Card.Content>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Meta>
                      {" "}
                      {moment(startTime).format("MMM Do YYYY")} -{" "}
                      {moment(endTime).format("MMM Do YYYY")}
                    </Card.Meta>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
          <Divider />
          <Header size="large" textAlign="center" style={{ marginTop: "50px" }}>
            Events You Were Invited To
          </Header>
          <Card.Group centered>
            {this.state.eventsInvited.map((event, i) => {
              let startTime = event.start_timestamp * 1000;
              let endTime = event.end_timestamp * 1000;

              return (
                <Card key={event.name + i}>
                  <Card.Content>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Meta>
                      {" "}
                      {moment(startTime).format("MMM Do YYYY")} -{" "}
                      {moment(endTime).format("MMM Do YYYY")}
                    </Card.Meta>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let yourEvents = await userSession.getFile("events/your_events.json");
    let eventsJoined = await userSession.getFile(
      "events/your_event_responses.json"
    );
    let eventsInvited = await userSession.getFile(
      "events/event_invitations.json"
    );
    if (yourEvents !== null) {
      yourEvents = JSON.parse(yourEvents);
      yourEvents = yourEvents.your_events;
    }
    if (eventsJoined !== null) {
      eventsJoined = JSON.parse(eventsJoined);
      eventsJoined = eventsJoined.event_responses.events_joined;
    }
    if (eventsInvited !== null) {
      eventsInvited = JSON.parse(eventsInvited);
      eventsInvited = eventsInvited.events_invited;
    }

    this.setState({
      yourEvents: yourEvents || [],
      eventsJoined: eventsJoined || [],
      eventsInvited: eventsInvited || [],
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
