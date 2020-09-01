import React, { Component } from "react";
import firebase from "../../config/firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser,
  };
  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
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
          <Header style={{ padding: "1.5em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={this.state.user.photoURL}
                    spaced="right"
                    avatar
                  ></Image>
                  {this.state.user.displayName}
                </span>
              }
              options={this.dropDownOptions()}
            ></Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStatetoProps)(UserPanel);
