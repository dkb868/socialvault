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
          <Menu.Item
            as={"a"}
            href="https://www.producthunt.com/posts/socialvault?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-socialvault"
            target="_blank"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=160211&theme=light"
              style={{ width: "250px", height: "54px" }}
              alt="SocialVault - Decentralized and encrypted storage for your Facebook data | Product Hunt Embed"
            />
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
