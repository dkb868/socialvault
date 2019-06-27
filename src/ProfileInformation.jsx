import React, { Component } from "react";
import { Person, getFileUrl } from "blockstack";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Sidebar,
  Segment,
  Dimmer,
  Loader,
  Image,
  Icon,
  Container,
  List,
  Header
} from "semantic-ui-react";

export default class ProfileInformation extends Component {
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
      profile: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let { profile } = this.state;

    if (this.state.isLoading) {
      return (
        <div>
          <Header size="huge" textAlign="center">
            Profile
          </Header>
          <Container text>
            <Dimmer inverted active>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
              style={{ margin: "50px 0" }}
            />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Container>
        </div>
      );
    }

    return (
      <div>
        <Header size="huge" textAlign="center">
          Profile
        </Header>
        <Container text>
          <Header size="medium" textAlign="center">
            Your Profile Information{" "}
            {profile != null ? `- ${profile.name.full_name}` : ""}
          </Header>
          {profile != null && (
            <div>
              <Header size="small">
                {profile != null &&
                  `Profile Created - ${moment(
                    profile.registration_timestamp * 1000
                  ).format("MMM Do YYYY")}`}
              </Header>
              {profile.emails && (
                <div>
                  <Header size="small">Emails</Header>
                  <List size="large" bulleted>
                    {profile.emails.emails &&
                      profile.emails.emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.previous_emails &&
                      profile.emails.previous_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.pending_emails &&
                      profile.emails.pending_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.ad_account_emails &&
                      profile.emails.ad_account_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                  </List>{" "}
                </div>
              )}
              <Header size="small">{`Birthday - ${profile.birthday &&
                profile.birthday.month}/${profile.birthday &&
                profile.birthday.day}/${profile.birthday &&
                profile.birthday.year}`}</Header>
              <Header size="small">{`Gender and Pronoun ${profile.gender &&
                profile.gender.gender_option}, ${profile.gender &&
                profile.gender.pronoun}`}</Header>
              <Header size="small">Previous Names</Header>
              <List size="large" bulleted>
                {profile.previous_names &&
                  profile.previous_names.map((name, i) => (
                    <List.Item key={name + i}>{name}</List.Item>
                  ))}
              </List>
              <Header size="small">Other Names</Header>
              <List size="large" bulleted>
                {profile.other_names &&
                  profile.other_names.map((name, i) => (
                    <List.Item key={name.name + i}>
                      {name.name}, {name.type}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">
                Current City -{" "}
                {profile.current_city && profile.current_city.name}
              </Header>
              <Header size="small">
                Hometown - {profile.hometown && profile.hometown.name}
              </Header>
              <Header size="small">
                Relationship Status -{" "}
                {profile.relationship && profile.relationship.status}
              </Header>
              <Header size="small">Family Members</Header>
              <List size="large" bulleted>
                {profile.family_members &&
                  profile.family_members.map((family, i) => (
                    <List.Item key={family.name + i}>
                      {family.name}, {family.relation}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Education History</Header>
              <List size="large" bulleted>
                {profile.education_experiences &&
                  profile.education_experiences.map((edu, i) => (
                    <List.Item key={edu.name + i}>
                      {edu.name}, {edu.school_type}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Work History</Header>
              <List size="large" bulleted>
                {profile.work_experiences &&
                  profile.work_experiences.map((work, i) => (
                    <List.Item key={work.employer + i}>
                      {work.title}, {work.employer} - {work.location}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Languages</Header>
              <List size="large" bulleted>
                {profile.languages &&
                  profile.languages.map((lang, i) => (
                    <List.Item key={lang + i}>{lang}</List.Item>
                  ))}
              </List>
              <Header size="small">Interested In</Header>
              <List size="large" bulleted>
                {profile.interested_in &&
                  profile.interested_in.map((interest, i) => (
                    <List.Item key={interest + i}>{interest}</List.Item>
                  ))}
              </List>
              <Header size="small">Phone Numbers</Header>
              <List size="large" bulleted>
                {profile.phone_numbers &&
                  profile.phone_numbers.map((num, i) => (
                    <List.Item key={num.phone_number + i}>
                      {num.phone_number}, {num.phone_type}
                    </List.Item>
                  ))}
              </List>
            </div>
          )}
        </Container>
      </div>
    );
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    let profile = await userSession.getFile(
      "profile_information/profile_information.json"
    );

    if (profile !== null) {
      profile = JSON.parse(profile);
      profile = profile.profile;
    }

    this.setState({
      profile: profile || null,
      isLoading: false
    });
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
      username: userSession.loadUserData().username
    });
  }
}
