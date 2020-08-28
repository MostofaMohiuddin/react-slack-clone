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

class Login extends Component {
  state = {
    email: "",
    password: "",

    errors: "",
    loading: false,
  };
  onChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandle = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          this.setState({ loading: false, errors: "" });
          console.log(signedInUser);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: "There is no user record corresponding to this identifier.",
          });
          this.setState({ loading: false });
        });
    } else {
      this.setState({ errors: "Fill up Form" });
      console.log(this.state.errors);
    }
  };

  isFormValid = () =>
    this.state.email.length > 0 && this.state.password.length > 0;

  addErrorClass = (error, inputName) => {
    return error.toLocaleLowerCase().includes(inputName);
  };

  render() {
    return (
      <div className="center-item login-card">
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

              <Button
                disabled={this.state.loading}
                loading={this.state.loading}
                fluid
                color="purple"
              >
                Login
              </Button>
            </Form>

            <span className="alreadyusertext"></span>
          </Segment>
        </Card>
        {this.state.errors.length !== 0 ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <Message negative>
              <Message.Header>Login Failed</Message.Header>
              <p>{this.state.errors}</p>
            </Message>
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ textAlign: "center" }}>
          <Message>
            Don't have an Account?
            <Link to="/register"> Register here</Link>
          </Message>
        </div>
      </div>
    );
  }
}

export default Login;
