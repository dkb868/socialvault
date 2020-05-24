// The main dashboard for people to browse through their data
import React, { Component } from "react";
import _ from "lodash";
import { Container, Loader, Table, Header } from "semantic-ui-react";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      people: [],
      column: null,
      direction: null,
    };
    this.getConversationData = this.getConversationData.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { column, people, direction } = this.state;

    return (
      <div>
        <Header size="large" textAlign="center">
          Your Albums
        </Header>

        <Container>
          <Loader size="huge" active={this.state.isLoading} />
          <Table definition sortable fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell
                  sorted={column === "msgSent" ? direction : null}
                  onClick={this.handleSort("msgSent")}
                >
                  Msg Sent
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "msgWordsSent" ? direction : null}
                  onClick={this.handleSort("msgWordsSent")}
                >
                  Words Sent
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "msgRecieved" ? direction : null}
                  onClick={this.handleSort("msgRecieved")}
                >
                  Msg Recieved
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "msgWordsRecieved" ? direction : null}
                  onClick={this.handleSort("msgWordsRecieved")}
                >
                  Words Recieved
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "totalMsg" ? direction : null}
                  onClick={this.handleSort("totalMsg")}
                >
                  Total Msg
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "totalWords" ? direction : null}
                  onClick={this.handleSort("totalWords")}
                >
                  Total Words
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "msgDiff" ? direction : null}
                  onClick={this.handleSort("msgDiff")}
                >
                  Msg Diff
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "wordsDiff" ? direction : null}
                  onClick={this.handleSort("wordsDiff")}
                >
                  Words Diff
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {people.map((p) => {
                return (
                  <Table.Row key={p.name}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>{p.msgSent}</Table.Cell>
                    <Table.Cell>{p.msgWordsSent}</Table.Cell>
                    <Table.Cell>{p.msgRecieved}</Table.Cell>
                    <Table.Cell>{p.msgWordsRecieved}</Table.Cell>
                    <Table.Cell>{p.totalMsg}</Table.Cell>
                    <Table.Cell>{p.totalWords}</Table.Cell>
                    <Table.Cell>{p.msgDiff}</Table.Cell>
                    <Table.Cell>{p.wordsDiff}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
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

    if (profile === null) {
      console.error("NEED PROFILE TO CONTINUE");
      return;
    }

    profile = JSON.parse(profile);
    profile = profile.profile;
    console.log("P", profile);

    // get all the albums
    let peopleDict = {};
    let i = 0;
    let conversationList;
    do {
      const indexList = [];
      for (let j = 0; j < 33; j++) {
        indexList.push(i++);
      }
      const filePs = indexList.map((n) =>
        this.getConversationData(n, profile.name.full_name)
      );
      conversationList = await Promise.all(filePs);
      for (let conv of conversationList) {
        if (conv === null) {
          continue;
        }

        const {
          msgWordsSent,
          msgSent,
          msgWordsRecieved,
          msgRecieved,
          name,
        } = conv;
        if (peopleDict[name] === undefined) {
          peopleDict[name] = {
            msgWordsSent,
            msgSent,
            msgWordsRecieved,
            msgRecieved,
          };
        } else {
          peopleDict[name].msgWordsSent += msgWordsSent;
          peopleDict[name].msgSent += msgSent;
          peopleDict[name].msgWordsRecieved += msgWordsRecieved;
          peopleDict[name].msgRecieved += msgRecieved;
        }
      }

      let newPeople = [];
      for (let friendName of Object.keys(peopleDict)) {
        const data = peopleDict[friendName];
        newPeople.push({
          name: friendName,
          ...data,
          totalMsg: data.msgSent + data.msgRecieved,
          totalWords: data.msgWordsSent + data.msgWordsRecieved,
          msgDiff: data.msgRecieved - data.msgSent,
          wordsDiff: data.msgWordsRecieved - data.msgWordsSent,
        });
      }
      this.setState({ people: newPeople });
    } while (conversationList.some((x) => x !== null));

    console.log(conversationList);
    console.log("Finished loading");

    this.setState({
      isLoading: false,
    });
  }

  async getConversationData(i, myName) {
    let data = null;
    try {
      let conversation = await this.props.userSession.getFile(
        `messages/inbox/${i}.json`
      );
      if (conversation) {
        conversation = JSON.parse(conversation);
        if (
          conversation.participants.length === 2 &&
          conversation.messages.length > 1
        ) {
          let friendName = conversation.participants.filter(
            (x) => x.name !== myName
          )[0].name;
          let msgWordsSent = 0;
          let msgSent = 0;
          let msgRecieved = 0;
          let msgWordsRecieved = 0;
          for (let msg of conversation.messages) {
            // console.log(msg);
            if (msg.sender_name === friendName) {
              msgRecieved += 1;
              if (msg.content) {
                msgWordsRecieved += msg.content.split(" ").length;
              } else {
                msgWordsRecieved += 5;
                //can also have sticker, photos, etc
              }
            } else if (msg.sender_name === myName) {
              msgSent += 1;
              if (msg.content) {
                msgWordsSent += msg.content.split(" ").length;
              } else {
                msgWordsSent += 5;
              }
            } else {
              //usually happens doing group conversations that people left to leave 2 people so just ignore entire convo
              return null;
              // console.error("Unexpected sender", msg);
            }
          }
          data = {
            msgWordsSent,
            msgSent,
            msgWordsRecieved,
            msgRecieved,
            name: friendName,
          };
        }
      }
    } catch (err) {
      console.error("Error getting", i, ": ", err);
    }

    return data;
  }

  handleSort = (clickedColumn) => () => {
    const { column, people, direction } = this.state;

    console.log("HANDLE SORT");
    if (column !== clickedColumn) {
      const sortedPeople = _.sortBy(people, [clickedColumn]);
      console.log(sortedPeople, clickedColumn);
      this.setState({
        column: clickedColumn,
        people: sortedPeople.reverse(),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      people: people.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };
}
