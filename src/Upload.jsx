import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Button,
  Icon,
  Progress,
  Container,
  Grid,
  List,
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
        }
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
            console.log("File successfully uploaded to Gaia storage", fileName);
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.setState(
              prevState => ({
                doneCount: prevState.doneCount + 1
              }),
              async () => {
                if (this.state.doneCount === totalFiles) {
                  let uploadCheck = { uploaded: true };
                  await userSession.putFile(
                    "uploadcheck.json",
                    JSON.stringify(uploadCheck)
                  );
                  this.setState({ uploadComplete: true });
                }
              }
            );
          });
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
            console.log(
              "Image successfully uploaded to Gaia storage",
              fileName
            );
          })
          .catch(err => console.log(err))
          .finally(() => {
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
          });
      };
    }
  }

  render() {
    if (this.state.uploadComplete) {
      return <Redirect to="/main" />;
    }
    return (
      <div>
        <Header size="huge" textAlign="center">
          Upload Your Facebook Data
        </Header>
        <Container text>
          <Header size="medium">Downloading your data from Facebook</Header>
          <Header size="small">Go to Your Facebook Information</Header>
          <p>
            Go to the{" "}
            <a
              href="https://www.facebook.com/settings?tab=your_facebook_information"
              target="__blank"
            >
              Your Facebook Information
            </a>{" "}
            page and you will see a list of links, click the one that says
            "Download Your Information".
          </p>
          <Image size="huge" src={require("./yourfacebookinfo.png")} />
          <Header size="small">Adjust Download Settings</Header>
          <List ordered>
            <List.Item>
              For the "Date Range" option, select "All of my data"
            </List.Item>
            <List.Item>
              For the "Format" option, select <strong>JSON</strong>
            </List.Item>
            <List.Item>
              For Media Quality, please select Medium, otherwise the image files
              may be too large for upload
            </List.Item>
            <List.Item>
              Click on the "Create File" button to request your data
            </List.Item>
          </List>

          <Image size="huge" src={require("./downloadyourdata.png")} />
          <br />
          <Image size="huge" src={require("./filebeingcreated.png")} />
          <br />
          <p>
            Facebook will send you an email when they've prepared your data for
            download. This can take up to a few days.
          </p>

          <Header size="medium">Uploading to SocialVault</Header>
          <Header size="small">Select your folder</Header>
          <p>
            After downloading your facebook data, you should have a folder named
            "facebook-username"
          </p>
          <p>
            To upload your data, click the "Select Folder" button below, then
            open your "facebook-username" folder and click upload.
          </p>
          <Image size="huge" src={require("./uploadfolder.png")} />
          <br />
          <p>
            <strong>
              IMPORTANT: We currently do not store messages, videos and stories
              due to the large file sizes. However, support for this will be
              added later. So please don't delete your local copy of these
              folders, because there will be no backup.
            </strong>
          </p>
          <Container
            text
            textAlign="center"
            style={{ marginBottom: "70px", marginTop: "50px" }}
          >
            <Loader inline="centered" size="huge" active={this.state.isLoading}>
              Loading Files
            </Loader>
            {!this.state.fbDataLoaded && (
              <div>
                {" "}
                <input
                  webkitdirectory=""
                  directory=""
                  mozdirectory=""
                  type="file"
                  multiple
                  id="fbfiles"
                  onClick={e => this.setState({ isLoading: true })}
                  onChange={e => this.handleFileChange(e)}
                  className="inputfile"
                />
                <Button size="big" as="label" htmlFor="fbfiles" color="blue">
                  <Icon name="upload" />
                  Select Folder
                </Button>
              </div>
            )}

            <br />
            {this.state.fbDataLoaded && (
              <div>
                <Header size="medium">
                  {this.state.smallFiles.length + this.state.photoFiles.length}{" "}
                  files ready for upload
                </Header>
                {this.state.uploadStarted ? (
                  <Progress
                    active
                    progress
                    success={this.state.uploadComplete}
                    color="teal"
                    percent={Math.ceil(
                      (this.state.doneCount /
                        (this.state.smallFiles.length +
                          this.state.photoFiles.length)) *
                        100
                    )}
                  >
                    This may take a while...
                  </Progress>
                ) : (
                  <Button
                    color="teal"
                    onClick={() => this.handleFileUpload()}
                    size="big"
                  >
                    Upload Your Facebook Data
                  </Button>
                )}
              </div>
            )}
          </Container>
        </Container>
      </div>
    );
  }

  async componentWillMount() {
    const { userSession } = this.props;
    let uploadCheck = await userSession.getFile("uploadcheck.json");

    this.setState({
      person: new Person(userSession.loadUserData().profile),
      username: userSession.loadUserData().username
    });
  }
}
