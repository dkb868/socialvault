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
              {profile.emails !== undefined && (
                <div>
                  <Header size="small">Emails</Header>
                  <List size="large" bulleted>
                    {profile.emails.emails !== undefined &&
                      profile.emails.emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.previous_emails !== undefined &&
                      profile.emails.previous_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.pending_emails !== undefined &&
                      profile.emails.pending_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                    {profile.emails.ad_account_emails !== undefined &&
                      profile.emails.ad_account_emails.map((email, i) => (
                        <List.Item key={email + i}>{email}</List.Item>
                      ))}
                  </List>{" "}
                </div>
              )}
              <Header size="small">{`Birthday - ${profile.birthday !==
                undefined && profile.birthday.month}/${profile.birthday !==
                undefined && profile.birthday.day}/${profile.birthday !==
                undefined && profile.birthday.year}`}</Header>
              <Header size="small">{`Gender and Pronoun ${profile.gender !==
                undefined && profile.gender.gender_option}, ${profile.gender !==
                undefined && profile.gender.pronoun}`}</Header>
              <Header size="small">Previous Names</Header>
              <List size="large" bulleted>
                {profile.previous_names !== undefined &&
                  profile.previous_names.map((name, i) => (
                    <List.Item key={name + i}>{name}</List.Item>
                  ))}
              </List>
              <Header size="small">Other Names</Header>
              <List size="large" bulleted>
                {profile.other_names !== undefined &&
                  profile.other_names.map((name, i) => (
                    <List.Item key={name.name + i}>
                      {name.name}, {name.type}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">
                Current City -{" "}
                {profile.current_city !== undefined &&
                  profile.current_city.name}
              </Header>
              <Header size="small">
                Hometown -{" "}
                {profile.hometown !== undefined && profile.hometown.name}
              </Header>
              <Header size="small">
                Relationship Status -{" "}
                {profile.relationship !== undefined &&
                  profile.relationship.status}
              </Header>
              <Header size="small">Family Members</Header>
              <List size="large" bulleted>
                {profile.family_members !== undefined &&
                  profile.family_members.map((family, i) => (
                    <List.Item key={family.name + i}>
                      {family.name}, {family.relation}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Education History</Header>
              <List size="large" bulleted>
                {profile.education_experiences !== undefined &&
                  profile.education_experiences.map((edu, i) => (
                    <List.Item key={edu.name + i}>
                      {edu.name}, {edu.school_type}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Work History</Header>
              <List size="large" bulleted>
                {profile.work_experiences !== undefined &&
                  profile.work_experiences.map((work, i) => (
                    <List.Item key={work.employer + i}>
                      {work.title}, {work.employer} - {work.location}
                    </List.Item>
                  ))}
              </List>
              <Header size="small">Languages</Header>
              <List size="large" bulleted>
                {profile.languages !== undefined &&
                  profile.languages.map((lang, i) => (
                    <List.Item key={lang + i}>{lang}</List.Item>
                  ))}
              </List>
              <Header size="small">Interested In</Header>
              <List size="large" bulleted>
                {profile.interested_in !== undefined &&
                  profile.interested_in.map((interest, i) => (
                    <List.Item key={interest + i}>{interest}</List.Item>
                  ))}
              </List>
              <Header size="small">Phone Numbers</Header>
              <List size="large" bulleted>
                {profile.phone_numbers !== undefined &&
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
