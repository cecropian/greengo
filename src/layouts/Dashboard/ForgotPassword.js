import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from 'prop-types';

import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

import Button from "components/CustomButtons/Button.jsx";
import { authenticateUser } from "./Cognito";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loading: false
    };
  }

  handleForgotPasswordSubmit(e) {
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
          <Typography
            component="h4"
            variant="display1"
            style={{ paddingTop: "15px" }}
          >
            Forgot Password
          </Typography>
          <form
            onSubmit={this.handleForgotPasswordSubmit}
            style={{ padding: "15px" }}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={this.state.email}
                autoFocus
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Send Reset Email
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default ForgotPassword;
