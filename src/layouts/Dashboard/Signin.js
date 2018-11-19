import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import Button from "components/CustomButtons/Button.jsx";
import { authenticateUser } from "./Cognito";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);
    this.handleForgotPasswordClose = this.handleForgotPasswordClose.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      forgotOpen: false
    };
  }

  handleLoginClose = () => {
    this.setState({ loginOpen: false });
  };

  handleForgotPasswordClose = () => {
    this.setState({ forgotOpen: false });
  };

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSigninSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    // console.log("Entered:", this.state);
    authenticateUser(
      this.state.username,
      this.state.password,
      (err, result) => {
        if (err) {
          // console.log(err)
          this.setState({ loading: false });
          return;
        }
        // console.log(result);
        this.setState({ loading: false });
        window.location.reload();
      }
    );
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <CssBaseline />
        <Paper>
          <Typography component="h4" variant="display1" style={{ paddingTop: "15px" }}>
            Sign in
          </Typography>
          <form onSubmit={this.handleSigninSubmit} style={{ padding: "15px" }}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={this.state.username}
                onChange={this.changeUsername}
                name="username"
                type="text"
                autoComplete="username"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                value={this.state.password}
                onChange={this.changePassword}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <div>
              <Button
                variant="contained"
                color="warning"
                onClick={this.handleClickForgotPasswordOpen}
              >
                Forgot Password
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.state.loading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Paper>
        {/*
        <Dialog
          open={this.state.forgotOpen}
          onClose={this.handleForgotPasswordClose}
          aria-labelledby="form-dialog-forgot"
        >
          <Paper>
            <Typography component="h3" variant="display2">
              Forgot Password
            </Typography>
            <form>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Send Reset Email
              </Button>
            </form>
          </Paper>
        </Dialog>
        */}
      </div>
    );
  }
}

export default Signin;

/*
<div className="Signin">
  <h2>Sign In</h2>
  <form onSubmit={this.handleSigninSubmit}>
    <div>
      <input
        value={this.state.username}
        placeholder="Username"
        type="text"
        onChange={this.changeUsername}
      />
    </div>
    <div>
      <input
        value={this.state.password}
        placeholder="Password"
        type="password"
        minLength={6}
        onChange={this.changePassword}
      />
    </div>
    <div>
      <button type="submit" disabled={this.state.loading}>
        Sign In
      </button>
    </div>
  </form>
</div>
*/
