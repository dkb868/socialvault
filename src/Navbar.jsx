// The main dashboard for people to browse through their data
import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Segment,
  Icon,
  Container,
  Grid,
  Menu,
  Image,
  Label,
  Input,
  Header
} from "semantic-ui-react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Menu size="huge" secondary>
          <Menu.Item header as={Link} to="/">
            SocialVault
          </Menu.Item>

          <Menu.Item as={Link} to="/" name="home" />
          {this.props.userSession.isUserSignedIn() === true && (
            <Menu.Item as={Link} to="/upload" name="upload Facebook Data" />
          )}

          <Menu.Menu position="right">
            {this.props.userSession.isUserSignedIn() === true ? (
              <Menu.Item name="Logout" onClick={this.props.handleSignOut} />
            ) : (
              <Menu.Item name="Login" onClick={this.props.handleSignIn} />
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}
