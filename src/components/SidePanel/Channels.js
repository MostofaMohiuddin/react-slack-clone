import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import firebase from "../../config/firebase";
import { connect } from "react-redux";
import { SET_CURRENT_CHANNEL, CLEAR_CHANNEL } from "../../actions/types";

class Channels extends Component {
  state = {
    channels: [],
    activeChannel: "",
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
  };

  componentDidMount() {
    this.addListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }

  addListener = () => {
    let loadedChannel = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannel.push(snap.val());
      this.setState({ channels: loadedChannel }, () => this.setFirstChannel());
    });
  };

  removeListener = () => {
    this.state.channelsRef.off("child_added");
    this.props.clearChannel();
  };

  setFirstChannel = () => {
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.changeChannel(this.state.channels[0]);
      this.setState({ activeChannel: this.state.channels[0].id });
    }
    this.setState({ firstLoad: false });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      console.log("Added ");
      this.addChannel();
    } else {
      console.log("error");
    }
  };

  isFormValid = () => this.state.channelName && this.state.channelDetails;

  addChannel = () => {
    const key = this.state.channelsRef.push().key;
    const newChannel = {
      id: key,
      name: this.state.channelName,
      details: this.state.channelDetails,
      createdBy: {
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL,
      },
    };

    this.state.channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({
          channelName: "",
          channelDetails: "",
        });
        this.closeModal();
      });
  };

  displayChannel = () => {
    let channels = this.state.channels;
    if (channels.length > 0) {
      return channels.map((channel) => {
        return (
          <Menu.Item
            key={channel.id}
            onClick={() => {
              this.props.changeChannel(channel);
              this.setState({ activeChannel: channel.id });
            }}
            name={channel.name}
            style={{ opacity: "0.7" }}
            active={this.state.activeChannel === channel.id}
          >
            #{channel.name}
          </Menu.Item>
        );
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>
            {"  "}({this.state.channels.length}){" "}
            <Icon
              name="add"
              onClick={this.openModal}
              style={{ cursor: "pointer" }}
            />
          </Menu.Item>
          {this.displayChannel()}
        </Menu.Menu>

        <Modal basic open={this.state.modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark"></Icon>Add
            </Button>
            <Button color="green" inverted onClick={this.closeModal}>
              <Icon name="remove"></Icon>Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeChannel: (channel) => {
      dispatch({
        type: SET_CURRENT_CHANNEL,
        payload: { currentChannel: channel },
      });
    },
    clearChannel: () => {
      dispatch({
        type: CLEAR_CHANNEL,
        payload: { currentChannel: null },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
