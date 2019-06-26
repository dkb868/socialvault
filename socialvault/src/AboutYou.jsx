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

export default class AboutYou extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
          
      },
      isLoading: false,
      friendPeerGroup: "",
      addressBook: []
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
            About You
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
          About You
        </Header>
        <Header size="medium" textAlign="center">
          Friend Peer Group: {this.state.friendPeerGroup}
        </Header>
        {this.state.addressBook.length ? (
          <div>
            <Header size="large" textAlign="center">
              Address Book
            </Header>
            <Container text>
              <Feed size="large">
                {this.state.addressBook.map(contact => {
                  return (
                    <Feed.Event key={contact.name + contact.created_timestamp}>
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{contact.name}</Feed.User>{" "}
                          {contact.details.length
                            ? contact.details[0].contact_point
                            : null}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  );
                })}
              </Feed>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let friendPeerGroup = await userSession.getFile(
      "about_you/friend_peer_group.json"
    );
    let addressBook = await userSession.getFile(
      "about_you/your_address_books.json"
    );
    if (friendPeerGroup !== null) {
      friendPeerGroup = JSON.parse(friendPeerGroup);
      friendPeerGroup = friendPeerGroup.friend_peer_group;
    }
    if (addressBook !== null) {
      addressBook = JSON.parse(addressBook);
      // Ugly but oh well
      addressBook = addressBook.address_book.address_book;
    }

    this.setState({
      friendPeerGroup: friendPeerGroup || "",
      addressBook: addressBook || [],
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
