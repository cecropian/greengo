import React, { Component } from "react";
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import { authenticateUser } from "./Cognito";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      user: "",
      showPassword: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSigninSubmit = e => {
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
        let user = result.idToken.payload;
        this.setState({ user: `${user.given_name} ${user.family_name}` });
      }
    );
  };

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
              Log in ({this.state.user})
            </Typography>
            <form onSubmit={this.handleSigninSubmit} style={{ padding: "15px" }}>
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
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
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
                    Log in
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
              onClick={this.props.showForgotPassword}
            >
              Forgot Password?
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

Login.propTypes = {
  showRegister: PropTypes.func.isRequired,
  showForgotPassword: PropTypes.func.isRequired,
  showResendCode: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default Login;
