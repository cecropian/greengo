import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from 'prop-types';

import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '@material-ui/core/Button';
import { authenticateUser } from "./Cognito";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false
    };
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
        <Card>
          <CardContent>
            <Typography
              component="h4"
              variant="display1"
              style={{ paddingTop: "15px" }}
            >
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={this.state.loading}
                  fullWidth
                >
                  Sign in
            </Button>
              </div>
            </form>
          </CardContent>
          <CardActions style={{backgroundColor: "#E0E0E0"}}>
            <Button size="small" color="secondary" variant="text">
              Register
            </Button>
            <Button size="small" color="secondary" variant="text">
              Forgot Password?
            </Button>
            <Button size="small" color="secondary" variant="text">
              Resend Code
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Signin.propTypes = {
  forgotpassword: PropTypes.func.isRequired
};

export default Signin;
