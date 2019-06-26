import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Dimmer,
  Loader,
  Image,
  Icon,
  Container,
  Divider,
  Header
} from "semantic-ui-react";

export default class Notes extends Component {
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
      notes: []
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
            Notes
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
          Notes
        </Header>
        {this.state.notes.map(note => {
          let date = note.created_timestamp * 1000;

          return note.title ? (
            <Container key={(note.title = note.created_timestamp)} text>
              <Header size="medium" textAlign="center">
                {note.title} - {moment(date).format("MMM Do YYYY")}
              </Header>
              <p style={{ whiteSpace: "pre-wrap" }}>{note.text}</p>
              <Divider />
            </Container>
          ) : null;
        })}
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let notes = await userSession.getFile("posts/notes.json");

    if (notes !== null) {
      notes = JSON.parse(notes);
      notes = notes.notes;
    }

    this.setState({
      notes: notes || [],
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
