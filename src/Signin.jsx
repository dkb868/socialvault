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
    <Button inverted onClick={handleSignIn.bind(this)} size="huge">
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
                  <a
                    href="https://www.producthunt.com/posts/socialvault?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-socialvault"
                    target="_blank"
                  >
                    <Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=160211&theme=dark"
                      style={{
                        width: "250px",
                        height: "54px",
                        marginRight: "20px"
                      }}
                      alt="SocialVault - Decentralized and encrypted storage for your Facebook data | Product Hunt Embed"
                    />
                  </a>
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
                  <a
                    href="https://www.producthunt.com/posts/socialvault?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-socialvault"
                    target="_blank"
                  >
                    <Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=160211&theme=dark"
                      style={{
                        width: "250px",
                        height: "54px",
                        marginRight: "20px"
                      }}
                      alt="SocialVault - Decentralized and encrypted storage for your Facebook data | Product Hunt Embed"
                    />
                  </a>
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
        <Segment style={{ padding: "6em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Before you <a>#deletefacebook</a>, take your data with you
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Over the years, you've made many memories on Facebook. Don't
                  just delete your account, take your data with you and preserve
                  all those memories.
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Your data is secure
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Your data is decentralized and encrypted using Blockstack's
                  Gaia storage. This means that no one can access your data but
                  you. Read more about Blockstack Gaia storage{" "}
                  <a
                    href="https://docs.blockstack.org/storage/overview.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .{" "}
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src={require("./deletefacebookmine.png")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: "6em 0em" }} vertical>
          <Container>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Keep all your posts, photos and more
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Browse through your old photo albums, groups you've been in,
              events you've attended, friends posts on your timeline, and more.
            </p>
            <Grid stackable>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Image size="huge" src={require("./main.png")} />
                </Grid.Column>
                <Grid.Column>
                  <Image size="huge" src={require("./album.png")} />
                </Grid.Column>

                <Grid.Column>
                  <Image size="huge" src={require("./yourposts.png")} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Container textAlign="center">
              <Button
                style={{ marginTop: "10px" }}
                size="large"
                color="black"
                onClick={handleSignIn}
              >
                Sign up
              </Button>
            </Container>
          </Container>
        </Segment>
        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Eighty-four percent of users are somewhat or very concerned
                  how their data may be used by Facebook."
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  {" "}
                  <a
                    href="https://www.usatoday.com/story/tech/news/2018/03/28/people-really-deleting-their-facebook-accounts-its-complicated/464109002/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USA TODAY
                  </a>
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Just don’t like Facebook. Gives me the willies."
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <a
                    href="https://twitter.com/elonmusk/status/977660603975151616"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Elon Musk
                  </a>
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
                    <List.Item as="a" href="/about">
                      About SocialVault
                    </List.Item>
                    <List.Item as="a" href="/privacy">
                      Privacy
                    </List.Item>
                    <List.Item
                      as="a"
                      href="https://github.com/dkb868/socialvault"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Team
                  </Header>
                  <p>
                    Made with &nbsp;{" "}
                    <span role="image" aria-label="heart emoji">
                      ❤️
                    </span>{" "}
                    by{" "}
                    <a
                      href="https://twitter.com/dkb868"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @dkb868
                    </a>
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
