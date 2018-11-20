import React, { Component } from "react";
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import { authenticateUser } from "./Cognito";

class ConfirmCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      code: "",
      loading: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleConfirmCode(e) {
    e.preventDefault();
    this.setState({ loading: true });
    // console.log("Entered:", this.state);
    authenticateUser(
      this.state.username,
      'this.state.password',
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
              Confirm Code
            </Typography>
            <form onSubmit={this.handleConfirmCode} style={{ padding: "15px" }}>
              <div>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                  />
                </FormControl>
              </div>
              <div>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="code">Confirmation Code</InputLabel>
                  <Input
                    id="code"
                    value={this.state.code}
                    onChange={this.handleChange('code')}
                    name="code"
                    type="text"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={this.state.loading}
                    fullWidth
                  >
                    Confirm Code
                  </Button>
                </FormControl>
              </div>
            </form>
          </CardContent>
          <CardActions style={{ backgroundColor: "#E0E0E0" }}>
            <Button
              size="small"
              color="secondary"
              variant="text"
              onClick={this.props.showRegister}
            >
              Register
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="text"
              onClick={this.props.showLogin}
            >
              Login
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="text"
              onClick={this.props.showResendCode}
            >
              Resend Code
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ConfirmCode.propTypes = {
  showRegister: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  showResendCode: PropTypes.func.isRequired
};

export default ConfirmCode;
