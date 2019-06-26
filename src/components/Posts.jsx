// The main dashboard for people to browse through their data
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { getCategories } from "../utils.js";
import { Person, getFileUrl } from "blockstack";
import {
  Sidebar,
  Segment,
  Icon,
  Container,
  Grid,
  Menu,
  Image,
  Label,
  Card,
  Input,
  Header
} from "semantic-ui-react";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      categories: [
        {
          name: "your_posts",
          display_name: "Your Posts",
          enabled: true,
          icon: "newspaper",
          color: "blue",
          description: " Text and status updates you've shared on Facebook"
        },
        {
          name: "notes",
          display_name: "Notes",
          enabled: true,
          icon: "pencil",
          color: "teal",
          description: "Notes you've created"
        },
        {
          name: "other_peoples_posts_to_your_timeline",
          display_name: "Other People's Posts To Your Timeline",
          enabled: true,
          icon: "send",
          color: "olive",
          description: "Posts other people have shared on your timeline"
        }
      ]
    };
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Header size="large" textAlign="center">
          Posts
        </Header>
        <Container>
          <Card.Group stackable itemsPerRow={3}>
            {this.state.categories.map(category => (
              <Card
                key={category.name}
                as={Link}
                to={`/posts/${category.name}`}
              >
                <Card.Content textAlign="center">
                  <Icon
                    name={category.icon}
                    color={category.color}
                    size="huge"
                  />

                  <Card.Header style={{ marginTop: "10px" }}>
                    {category.display_name}{" "}
                  </Card.Header>

                  <Card.Description>{category.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
