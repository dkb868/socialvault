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

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header size="huge" textAlign="center">
          About SocialVault
        </Header>
        <Container text>
          <Image src={require("./me.jpg")} size="small" circular centered />
          <Header size="small" textAlign="center">
            Hi, I'm Dmitri, the maker of SocialVault
          </Header>
          <div style={{ fontSize: "1.2em" }}>
            <p>
              <strong>SocialVault</strong> is a place to securely store your
              Facebook data. More and more people are deleting their Facebook
              profiles everyday, yet we have so much data stored there in the
              form of posts, images, events we've attended in the past, and
              groups we've joined.
            </p>
            <p>
              {" "}
              Before you #deletefacebook, you can now take your data with you to
              keep all those memories alive. In the future, you may also be able
              to import your data from SocialVault into newer, more privacy
              focused social media platforms to make the transition easier.
            </p>
            <p>
              By using{" "}
              <a
                href="https://blockstack.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blockstack's
              </a>{" "}
              Gaia storage, you can store your data very securely. App
              developers like me are unable to access your data in any way, and
              the data is also encrypted. Read more about Gaia storage{" "}
              <a
                href="https://docs.blockstack.org/storage/overview.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .{" "}
            </p>

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
            <p>
              If you have any feedback, requests, or questions, feel free to
              leave a message in the chatbox below, or DM me on Twitter -{" "}
              <a
                href="https://twitter.com/dkb868"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dkb868
              </a>
              .
            </p>
          </div>
        </Container>
      </div>
    );
  }
}
