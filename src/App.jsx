import React, { Component } from "react";
import AboutYou from "./AboutYou.jsx";
import Groups from "./Groups.jsx";
import Photos from "./Photos.jsx";
import Navbar from "./Navbar.jsx";
import Upload from "./Upload.jsx";
import About from "./About.jsx";
import Notes from "./Notes.jsx";
import Posts from "./Posts.jsx";
import OtherPosts from "./OtherPosts.jsx";
import PhotoAlbum from "./PhotoAlbum.jsx";
import ProfileInformation from "./ProfileInformation.jsx";
import SearchHistory from "./SearchHistory.jsx";
import Pages from "./Pages.jsx";
import LikesAndReactions from "./LikesAndReactions.jsx";
import Comments from "./Comments.jsx";
import FollowingAndFollowers from "./FollowingAndFollowers.jsx";
import Events from "./Events.jsx";
import Friends from "./Friends.jsx";
import Main from "./Main.jsx";
import Signin from "./Signin.jsx";
import { UserSession, AppConfig } from "blockstack";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import YourPosts from "./YourPosts.jsx";
const appConfig = new AppConfig(["store_write", "email"]);
const userSession = new UserSession({ appConfig: appConfig });

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const LandingContainer = () => (
      <div>
        <Route
          exact
          path="/"
          component={() => (
            <Signin
              userSession={userSession}
              handleSignIn={this.handleSignIn}
            />
          )}
        />
      </div>
    );
    const DefaultContainer = () => (
      <div>
        <Navbar handleSignOut={this.handleSignOut} />

        <Route
          exact
          path="/upload"
          component={() => (
            <Upload
              userSession={userSession}
              handleSignIn={this.handleSignIn}
            />
          )}
        />

        <Route
          exact
          path="/about"
          component={() => (
            <About userSession={userSession} handleSignIn={this.handleSignIn} />
          )}
        />
        <Route
          exact
          path="/main"
          component={() => (
            <Main
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/friends"
          component={() => (
            <Friends
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/about_you"
          component={() => (
            <AboutYou
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />

        <Route
          exact
          path="/comments"
          component={() => (
            <Comments
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/events"
          component={() => (
            <Events
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/following_and_followers"
          component={() => (
            <FollowingAndFollowers
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/groups"
          component={() => (
            <Groups
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/likes_and_reactions"
          component={() => (
            <LikesAndReactions
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/pages"
          component={() => (
            <Pages
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/photos_and_videos"
          component={() => (
            <Photos
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/posts"
          component={() => (
            <Posts
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/posts/notes"
          component={() => (
            <Notes
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/posts/your_posts"
          component={() => (
            <YourPosts
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/posts/other_peoples_posts_to_your_timeline"
          component={() => (
            <OtherPosts
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          exact
          path="/profile_information"
          component={() => (
            <ProfileInformation
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />

        <Route
          exact
          path="/search_history"
          component={() => (
            <SearchHistory
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
        <Route
          path="/photos_and_videos/album/:albumId"
          component={props => (
            <PhotoAlbum
              {...props}
              userSession={userSession}
              handleSignOut={this.handleSignOut}
            />
          )}
        />
      </div>
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    );
  }

  componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }
}
