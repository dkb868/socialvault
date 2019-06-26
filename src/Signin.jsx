import PropTypes from "prop-types";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ handleSignIn, mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="SocialVault"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Decentralized, encrypted storage and browser for your Facebook data"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button
      inverted
      onClick={handleSignIn.bind(this)}
      color="black"
      size="huge"
    >
      Login with Blockstack
      <Icon name="right arrow" />
    </Button>
  </Container>
);

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { handleSignIn } = this.props;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>

                <Menu.Item position="right">
                  <Button inverted={!fixed} onClick={handleSignIn.bind(this)}>
                    Log in
                  </Button>
                  <Button
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                    onClick={handleSignIn.bind(this)}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading handleSignIn={handleSignIn} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const { handleSignIn } = this.props;
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>

          <Menu.Item onClick={handleSignIn.bind(this)}>Log in</Menu.Item>
          <Menu.Item onClick={handleSignIn.bind(this)}>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button onClick={handleSignIn.bind(this)} inverted>
                    Log in
                  </Button>
                  <Button
                    onClick={handleSignIn.bind(this)}
                    inverted
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading handleSignIn={handleSignIn} mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = props => (
  <div>
    <DesktopContainer {...props}>{props.children}</DesktopContainer>
    <MobileContainer {...props}>{props.children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default class Signin extends Component {
  render() {
    const { handleSignIn } = this.props;
    const isSignedIn = this.props.userSession.isUserSignedIn();
    return isSignedIn ? (
      <Redirect to="/main" />
    ) : (
      <ResponsiveContainer handleSignIn={handleSignIn}>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Before you #deletefacebook, take your data with you
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Over the years, you've made many memories on Facbeook. Don't just delete your account, take your data with you and preserve all those memories. 
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Your data is secure.
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Your data is decentralized and encrypted using Blockstack's Gaia storage. This means that no one can access your data but you. 
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="https://d41aeffj97otb.cloudfront.net/wp-content/uploads/2018/03/shift8-delete-facebook-1.jpg"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge" color="black" onClick={handleSignIn}>Try it out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Keep all your posts, photos and more
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Browse through your old photo albums, groups you've been in, events you've attended, friends posts on your timeline, and more.
            </p>
            <Button as="a" size="large" color="black" onClick={handleSignIn}>
              Sign up
            </Button>

          </Container>
        </Segment>
        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Eighty-four percent of users are somewhat or very concerned how their data may be used by Facebook."
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  USA TODAY
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Just don’t like Facebook. Gives me the willies."
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <Image avatar src="https://cdn.cnn.com/cnnnext/dam/assets/180907100732-elon-musk-smokes-marijuana-podcast-1-large-169.jpg" />
                  <b>Elon Musk</b>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

      

        <Segment inverted vertical style={{ padding: "2em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">About SocialVault</List.Item>
                    <List.Item as="a">Privacy</List.Item>
                    <List.Item as="a">Github</List.Item>

                  </List>
                </Grid.Column>
          
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Team
                  </Header>
                  <p>
                    Made with &nbsp; <span role="image" aria-label="heart emoji">❤️</span> by <a href="#">@dkb868</a>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}

/*
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;
    const isSignedIn = this.props.userSession.isUserSignedIn();
    return isSignedIn ? (
      <Redirect to="/main" />
    ) : (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="panel-landing" id="section-1">
            <h1 className="landing-heading">Hello, Blockstack!</h1>
            <p className="lead">
              <button
                className="btn btn-primary btn-lg"
                id="signin-button"
                onClick={handleSignIn.bind(this)}
              >
                Sign In with Blockstack
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
*/
