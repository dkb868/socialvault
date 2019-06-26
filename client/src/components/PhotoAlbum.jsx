// The main dashboard for people to browse through their data
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx.js";
import moment from "moment";
import { getCategories } from "   .js";
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

export default class PhotoAlbum extends Component {
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
      album: null,
      photos: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Header size="large" textAlign="center">
          {this.state.album &&
            `${this.state.album.name} - ${moment(
              this.state.album.last_modified_timestamp * 1000
            ).format("MMM Do, YYYY")}`}
        </Header>
        <Container>
          <Card.Group stackable itemsPerRow={3}>
            {this.state.photos.map(photo => {
              return (
                <Card key={photo}>
                  <Image src={photo} wrapped ui={false} size="tiny" />
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
    const {
      match: { params }
    } = this.props;
    this.setState({ isLoading: true });
    let album = await userSession.getFile(
      `photos_and_videos/album/${params.albumId}.json`
    );
    if (album !== null) {
      album = JSON.parse(album);
      if (album.photos.length > 0) {
        for (let photo of album.photos) {
          let imageData = await userSession.getFile(photo.uri);
          this.setState({
            photos: [...this.state.photos, imageData],
            album
          });
        }
      }
    }

    this.setState({
      isLoading: false
    });
  }
}
