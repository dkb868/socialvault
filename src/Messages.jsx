// The main dashboard for people to browse through their data
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import moment from "moment";
import { Person, getFileUrl } from "blockstack";
import {
  Sidebar,
  Segment,
  Icon,
  Dimmer,
  Container,
  Grid,
  Menu,
  Loader,
  Image,
  Label,
  Card,
  Input,
  Table,
  Header,
} from "semantic-ui-react";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      people: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { people } = this.state;

    return (
      <div>
        <Header size="large" textAlign="center">
          Your Albums
        </Header>

        <Container>
          <Loader size="huge" active={this.state.isLoading} />
          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Messages Sent</Table.HeaderCell>
                <Table.HeaderCell>Messages Words Sent</Table.HeaderCell>
                <Table.HeaderCell>Messages Recieved</Table.HeaderCell>
                <Table.HeaderCell>Messages Words Recieved</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.people).map((name) => {
                const data = this.state.people[name];
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{data.msgSent}</Table.Cell>
                      <Table.Cell>{data.msgWordsSent}</Table.Cell>
                      <Table.Cell>{data.msgRecieved}</Table.Cell>
                      <Table.Cell>{data.msgWordsRecieved}</Table.Cell>
                    </Table.Row>
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });

    let profile = await userSession.getFile(
      "profile_information/profile_information.json"
    );

    if (profile === null) {
      console.error("NEED PROFILE TO CONTINUE");
      return;
    }

    profile = JSON.parse(profile);
    profile = profile.profile;
    console.log("P", profile);

    // get all the albums
    let people = {};
    let i = 0;
    let mistakes = 0;
    let conversation = await userSession.getFile(`messages/inbox/${i}.json`);
    while (conversation) {
      try {
        // console.log(conversation);
        conversation = JSON.parse(conversation);
        if (conversation.participants.length === 2) {
          let friendName = conversation.participants.filter(
            (x) => x.name !== profile.name.full_name
          )[0].name;
          console.log(i, friendName, conversation);

          let msgWordsSent = 0;
          let msgSent = 0;
          let msgRecieved = 0;
          let msgWordsRecieved = 0;
          for (let msg of conversation.messages) {
            // console.log(msg);
            if (msg.sender_name === friendName) {
              msgRecieved += 1;
              if (msg.content) {
                msgWordsRecieved += msg.content.split(" ").length;
              } else {
                msgWordsRecieved += 5;
                //can also have sticker, photos, etc
              }
            } else if (msg.sender_name === profile.name.full_name) {
              msgSent += 1;
              if (msg.content) {
                msgWordsSent += msg.content.split(" ").length;
              } else {
                msgWordsSent += 5;
              }
            } else {
              console.error("Unexpected sender", msg);
            }
          }
          // console.log({ msgWordsSent, msgSent, msgWordsRecieved, msgRecieved });
          if (people[friendName] === undefined) {
            people[friendName] = {
              msgWordsSent,
              msgSent,
              msgWordsRecieved,
              msgRecieved,
            };
          } else {
            people[friendName].msgWordsSent += msgWordsSent;
            people[friendName].msgSent += msgSent;
            people[friendName].msgWordsRecieved += msgWordsRecieved;
            people[friendName].msgRecieved += msgRecieved;
          }
          console.log(people);
          this.setState({ people });
        }
      } catch (err) {
        console.error(i, err);
      }

      conversation = null;
      while (mistakes < 5 && !conversation) {
        i++;
        conversation = await userSession.getFile(`messages/inbox/${i}.json`);
        if (!conversation) {
          mistakes += 1;
          console.log("Weird mistake");
        }
      }
    }

    console.log("Finished loading");

    this.setState({
      isLoading: false,
    });
  }
}
