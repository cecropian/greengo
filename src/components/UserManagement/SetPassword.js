import React, { Component } from "react";

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { authenticateUser } from "./Cognito";

class SetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newpassword: "",
      confirmPassword: "",
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

  handleSetPasswordSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    // console.log("Entered:", this.state);
    authenticateUser(
      this.state.username,
      this.state.newpassword,
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
              Set Password
            </Typography>
            <form
              onSubmit={this.handleSetPasswordSubmit}
              style={{ padding: "15px" }}
            >
              <div>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.newpassword}
                    onChange={this.handleChange('newpassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
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
                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={this.state.loading}
                    fullWidth
                  >
                    Set Password
                  </Button>
                </FormControl>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SetPassword;
