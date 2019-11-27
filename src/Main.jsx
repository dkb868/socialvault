// The main dashboard for people to browse through their data
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { getCategories } from "./utils";
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
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      categories: getCategories(),
      isLoading: true,
      userUploadedData: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { activeItem } = this.state;
    if (this.state.userUploadedData === false) {
      return <Redirect to="/upload" />;
    }
    return (
      <div>
        <Header size="large" textAlign="center">
          Browse Facebook Data
        </Header>
        <Container>
          <Dimmer inverted active={this.state.isLoading}>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
          <Card.Group stackable itemsPerRow={3}>
            {this.state.categories.map(category => (
              <Card key={category.name} as={Link} to={`/${category.name}`}>
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

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let uploadCheck = await userSession.getFile("uploadcheck.json");
    let profile = await userSession.getFile(
      "profile_information/profile_information.json"
    );
    if (profile !== null) {
      this.setState({ userUploadedData: true });
    } else {
      if (uploadCheck === null) {
        uploadCheck = { uploaded: false };
        await userSession.putFile(
          "uploadcheck.json",
          JSON.stringify(uploadCheck)
        );
        this.setState({
          userUploadedData: false
        });
      } else {
        let check = JSON.parse(uploadCheck);
        if (check.uploaded) {
          this.setState({ userUploadedData: true });
        } else {
          this.setState({ userUploadedData: false });
        }
      }
    }

    this.setState({
      isLoading: false
    });
  }
}
