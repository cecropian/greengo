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

import { createUser } from "./Cognito";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      loading: false,
      showPassword: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleRegisterSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let username = this.state.username;
    let fields = this.state;
    let attributes = [
      { Name: "email", Value: fields.email },
      { Name: "family_name", Value: fields.lastname },
      { Name: "given_name", Value: fields.firstname },
      { Name: "custom:platformID", Value: "scrum.game" },
      { Name: "phone_number", Value: fields.phone }
    ];
    // console.log("Entered:", this.state);
    createUser(username, this.state.password, attributes, (err, result) => {
      if (err) {
        // console.log(err)
        this.setState({ loading: false });
        // handleCognitoExceptions (err, username);
        return;
      }
      // console.log(result);
      this.setState({ loading: false });
      let cognitoUser = result.user;
      this.props.showConfirmCode(cognitoUser.getUsername());
    });
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
              Register
            </Typography>
            <form
              onSubmit={this.handleRegisterSubmit}
              style={{ padding: "15px" }}
            >
              <div>
                <FormControl
                  margin="normal"
                  style={{
                    minWidth: 240,
                    maxWidth: 600
                  }}
                  required
                >
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
                <FormControl
                  margin="normal"
                  style={{
                    paddingRight: "15px",
                    minWidth: 120,
                    maxWidth: 300
                  }}
                  required
                >
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

                <FormControl
                  margin="normal"
                  style={{
                    minWidth: 240,
                    maxWidth: 300
                  }}
                  required
                >
                  <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                  <Input
                    id="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  margin="normal"
                  style={{
                    paddingRight: "15px",
                    minWidth: 240,
                    maxWidth: 300
                  }}
                  required
                >
                  <InputLabel htmlFor="firstname">First Name</InputLabel>
                  <Input
                    id="firstname"
                    value={this.state.firstname}
                    onChange={this.handleChange('firstname')}
                    name="firstname"
                    type="text"
                    autoComplete="given-name"
                  />
                </FormControl>

                <FormControl
                  margin="normal"
                  style={{
                    minWidth: 240,
                    maxWidth: 300
                  }}
                  required
                >
                  <InputLabel htmlFor="lastname">Last Name</InputLabel>
                  <Input
                    id="lastname"
                    value={this.state.lastname}
                    onChange={this.handleChange('lastname')}
                    name="lastname"
                    type="text"
                    autoComplete="family-name"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  margin="normal"
                  style={{
                    paddingRight: "15px",
                    minWidth: 240,
                    maxWidth: 300
                  }}
                  required
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>

                <FormControl
                  margin="normal"
                  style={{
                    minWidth: 240,
                    maxWidth: 300
                  }}
                  required
                >
                  <InputLabel htmlFor="phone">Mobile Phone</InputLabel>
                  <Input
                    id="phone"
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    name="phone"
                    type="text"
                    autoComplete="tel-national"
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
                    Register
                  </Button>
                </FormControl>
              </div>
            </form>
          </CardContent>
          <CardActions style={{ backgroundColor: "#E0E0E0" }}>
            <Typography component="span" variant="body1" color="textSecondary">
              Already have an account?
            </Typography>
            <Button
              size="small"
              color="secondary"
              variant="text"
              onClick={this.props.showLogin}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Register.propTypes = {
  showLogin: PropTypes.func.isRequired
};

export default Register;
