import React, { Component } from "react";
import {
  Input,
  Form,
  Button,
  Card,
  Icon,
  Segment,
  Message,
} from "semantic-ui-react";

import firebase from "../../config/firebase";

import "../../css/auth.css";
import "../../css/style.css";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errors: "",
    loading: false,
    usersRef: firebase.database().ref("users"),
  };
  onChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandle = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log(user);
          user.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `https://api.adorable.io/avatars/285/${user.user.email}`,
            })
            .then(() => {
              this.saveUser(user)
                .then(() => {
                  this.setState({ loading: false });
                  console.log("user saved");
                })
                .catch((err) => {
                  console.log(err);
                  this.setState({ errors: err.message, loading: false });
                });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ errors: err.message, loading: false });
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ errors: err.message, loading: false });
        });
    } else {
      console.log(this.state.errors);
    }
  };

  addErrorClass = (error, inputName) => {
    return error.toLocaleLowerCase().includes(inputName);
  };

  isFormValid = () => {
    var error;
    if (
      this.state.email === "" ||
      this.state.confirmPassword === "" ||
      this.state.password === "" ||
      this.username === ""
    ) {
      error = "Fill up every Field";
      this.setState({ errors: error });

      return false;
    } else if (
      this.state.confirmPassword !== this.state.password ||
      this.state.password.length < 6
    ) {
      error = "Invalid Password";
      this.setState({ errors: error });
      return false;
    } else return true;
  };

  saveUser = (user) => {
    return this.state.usersRef.child(user.user.uid).set({
      name: user.user.displayName,
      avatar: user.user.photoURL,
    });
  };

  render() {
    return (
      <div className="center-item register-card">
        <Card fluid>
          <Segment basic textAlign={"center"}>
            <Form className="auth-form" onSubmit={this.onSubmitHandle}>
              <div style={{ marginBottom: "20px" }}>
                <div>
                  <Icon name="wechat" size="massive" />
                </div>
                <div className="logoName">ChatBox</div>
              </div>
              <Form.Field>
                <Input
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChangeHandle}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChangeHandle}
                  error={this.addErrorClass(this.state.errors, "email")}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangeHandle}
                  error={this.addErrorClass(this.state.errors, "password")}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="confirmPassword"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeHandle}
                  error={this.addErrorClass(this.state.errors, "password")}
                />
              </Form.Field>

              <Button
                disabled={this.state.loading}
                loading={this.state.loading}
                fluid
                style={{ textAlign: "center" }}
                color="orange"
              >
                Sign Up
              </Button>
            </Form>

            <span className="alreadyusertext"></span>
          </Segment>
        </Card>
        {this.state.errors.length !== 0 ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <Message negative textAlign="center">
              <Message.Header>Registration Failed</Message.Header>
              <p>{this.state.errors}</p>
            </Message>
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ textAlign: "center" }}>
          <Message>
            Already an User?
            <Link to="/login"> login here</Link>
          </Message>
        </div>
      </div>
    );
  }
}

export default Register;
