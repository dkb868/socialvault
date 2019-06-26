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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default class Upload extends Component {
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
      pages: [],
      fbDataLoaded: false,
      smallFiles: [],
      photoFiles: [],
      uploadComplete: false,
      uploadStarted: false,
      doneCount: 0
    };
  }

  handleFileChange(event) {
    console.log(event.target.files);
    let fileCount = event.target.files.length;
    let currentFileIndex = 0;
    let smallFiles = [];
    let photoFiles = [];
    let progress = (currentFileIndex / fileCount) * 100;
    for (let file of event.target.files) {
      let folderName = file.webkitRelativePath.split("/")[1];

      if (folderName === "photos_and_videos") {
        // currently ignoring videos for file size
        if (file.webkitRelativePath.split("/")[2] === "videos") continue;
        photoFiles.push(file);
      } else if (folderName === "messages") {
        continue;
        // currently ignoring messages and stories folders for file size
      } else if (folderName === "stories") {
        continue;
      } else {
        smallFiles.push(file);
      }
    }

    this.setState({
      smallFiles,
      isLoading: false,
      photoFiles,
      fbDataLoaded: true
    });
  }

  async handleFileUpload() {
    this.setState({ uploadStarted: true });
    let totalFiles =
      this.state.smallFiles.length + this.state.photoFiles.length;
    const { userSession } = this.props;
    const { smallFiles, photoFiles } = this.state;
    // process small files first, they are quick to get stored and make the app instantly useful
    for (let file of smallFiles) {
      // remove the name of the unique facebook user from the path
      let fileName = file.webkitRelativePath.substring(
        file.webkitRelativePath.indexOf("/") + 1
      );
      let fr = new FileReader();
      fr.readAsText(file);
      fr.onload = () => {
        console.log(fr.result);
        userSession
          .putFile(fileName, fr.result)
          .then(() => {
            this.setState(
              prevState => ({
                doneCount: prevState.doneCount + 1
              }),
              () => {
                if (this.state.doneCount === totalFiles) {
                  this.setState({ uploadComplete: true });
                }
              }
            );
            console.log("File successfully uploaded to Gaia storage", fileName);
          })
          .catch(err => console.log(err));
      };
    }

    // process images second, this will take a longer time and require throttling so gaia doesn't fail.
    for (let file of photoFiles) {
      // hacky way to throttle so Gaia doesn't reject uploads
      await sleep(500);
      let fr = new FileReader();
      if (file.type.toLowerCase() === "application/json") {
        fr.readAsText(file);
      } else {
        fr.readAsDataURL(file);
      }

      // remove the name of the unique facebook user from the path
      let fileName = file.webkitRelativePath.substring(
        file.webkitRelativePath.indexOf("/") + 1
      );

      fr.onload = () => {
        userSession
          .putFile(fileName, fr.result)
          .then(() => {
            this.setState(
              prevState => ({
                doneCount: prevState.doneCount + 1
              }),
              () => {
                if (this.state.doneCount === totalFiles) {
                  this.setState({ uploadComplete: true });
                }
              }
            );
            console.log(
              "Image successfully uploaded to Gaia storage",
              fileName
            );
          })
          .catch(err => console.log(err));
      };
    }
  }

  render() {
 
    return (
      <div>
        <Header size="huge" textAlign="center">
          About SocialVault
        </Header>
        <Container textAlign="center" text>
          We are a decentralized encrypted data storage and browser for social
          media profiles. Before you #deletefacebook, make sure to save all your
          memories and data here.
        </Container>
      </div>
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
      username: userSession.loadUserData().username
    });
  }
}