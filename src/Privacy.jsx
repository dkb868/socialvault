import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Button,
  Icon,
  Progress,
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

export default class Privacy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header size="huge" textAlign="center">
          Privacy Policy
        </Header>
        <Container text>
          <div style={{ fontSize: "1.2em" }}>
            <p>
              This page explains how SocialVault handles all user data. The
              tl;dr is that everything is handled by Blockstack so we don't
              store any user data.
            </p>
            <Header size="medium">Files</Header>
            <p>
              {" "}
              All files you share will be encrypted using advanced security
              standards and then sent to a random hub to be stored. The
              encryption key will be stored in your device and private hub as
              encrypted with your identity key.
            </p>
            <Header size="medium">Third Party Services</Header>
            <Header size="small">Blockstack</Header>
            <p>
              We use{" "}
              <a
                href="https://blockstack.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blockstack's
              </a>{" "}
              Gaia storage to store all of your files securely. App developers
              are unable to access your data in any way and the data is
              encrypted. Read more about Gaia storage{" "}
              <a
                href="https://docs.blockstack.org/storage/overview.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .{" "}
            </p>
            <Header size="small">Google Analytics</Header>
            <p>
              We use Google Analytics on the website to track our usage. You can
              opt-out of Google Analytics with this{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                add-on
              </a>{" "}
              .
            </p>
            <Header size="medium">Open Source</Header>
            <p>
              The code for this project is open source, so you can take a look
              at it on{" "}
              <a
                href="https://github.com/dkb868/socialvault"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github.
              </a>
            </p>
            <Header size="medium">Updates</Header>
            <p>
              Any updates to this Privacy Policy will be posted on this page.
            </p>
            <Header size="medium">Contact</Header>
            <p>
              For questions about our Privacy Policy, please email
              socialvault@dkb.fyi.
            </p>
          </div>
        </Container>
      </div>
    );
  }
}
