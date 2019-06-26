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
  Dimmer,
  Container,
  Grid,
  Menu,
  Loader,
  Image,
  Label,
  Card,
  Input,
  Header
} from "semantic-ui-react";

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      person: {
        name() {
          return "Anonymous";
        }
      },
      username: "",

      isLoading: false,
      albums: []
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
    const { activeItem } = this.state;

    return (
      <div>
        <Header size="large" textAlign="center">
          Your Albums
        </Header>

        <Container>
          <Card.Group stackable itemsPerRow={4}>
            <Loader size="huge" active={this.state.isLoading} />
            {this.state.albums.map(album => {
              let date = album.last_modified_timestamp * 1000;
              return (
                <Card
                  key={album.name + album.last_modified_timestamp}
                  as={Link}
                  to={`/photos_and_videos/album/${album.number}`}
                >
                  <Image
                    src={album.coverImageData}
                    wrapped
                    ui={false}
                    size="tiny"
                  />
                  <Card.Content>
                    <Card.Header>{album.name}</Card.Header>
                    <Card.Meta>
                      <span className="date">
                        {moment(date).format("MMM Do YYYY")}
                      </span>
                    </Card.Meta>
                    <Card.Description>{album.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="camera" />
                    {album.photos.length} Photos
                  </Card.Content>
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
    this.setState({ isLoading: true });
    // get all the albums
    for (let i = 0; i < 100; i++) {
      let album = await userSession.getFile(
        `photos_and_videos/album/${i}.json`
      );
      if (album !== null) {
        album = JSON.parse(album);
        // apparently there's empty albums, let's skip those
        if (album.photos.length === 0) continue;
        if (this._isMounted) {
          album.coverImageData = await userSession.getFile(
            album.cover_photo.uri
          );
          album.number = i;
          this.setState({ albums: [...this.state.albums, album] });
        }
      } else {
        // if you find a null album, that means we've finished going through all the albums
        // so break out of this loop
        break;
      }
    }
    this.setState({
      isLoading: false
    });
  }
}
