import React, { Component } from "react";
import firebase from "../../config/firebase";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

class UserPanel extends Component {
  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avater",
      text: <span>Change Avatar</span>,
      disabled: false,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>,
      disabled: false,
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("sign out"));
  };

  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: "0" }}>
            {/* app header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Chat Box</Header.Content>
            </Header>
          </Grid.Row>

          {/* user dropdown */}
          <Header style={{ padding: ".5em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropDownOptions()}
            ></Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
