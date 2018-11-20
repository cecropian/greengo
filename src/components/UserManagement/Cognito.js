import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_1v5zwuw2i", // us-east-1_94f0CgD1D
  ClientId: "1hou8866pfj8co3edrf0f7pm5b" // 45j8368tdp71fr6eefvne38aje
};

const userPool = new CognitoUserPool(poolData);

export const createUser = (username, password, attributeList, callback) => {
  userPool.signUp(username, password, attributeList, null, callback);
  // Username must be unique in a pool, and cant be a valid email format
  // To log in with email, make sure it is set as an alias attribute in Cognito
  // More info: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-usernames
};

export const verifyUser = (username, verifyCode, callback) => {
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(verifyCode, true, callback);
};

export const authenticateUser = (email, password, callback) => {
  const authData = {
    Username: email,
    Password: password
  };
  const authDetails = new AuthenticationDetails(authData);
  const userData = {
    Username: email,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: result => {
      callback(null, result);
    },
    onFailure: err => {
      callback(err);
    }
  });
};

export const signOut = () => {
  userPool.getCurrentUser().signOut();
  window.location.reload();
};

export const getCurrentUser = callback => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) return false;

  cognitoUser.getSession((err, session) => {
    if (err) {
      return;
    }

    cognitoUser.getUserAttributes((err, attributes) => {
      callback(attributes);
    });
  });
};

/*
export const handleCognitoExceptions = (err, username) => {
  switch (err.code) {
    case "AliasExistsException":
      toastr["warning"](
        "Another customer is using the email or phone entered. Please change one or both and retry",
        "Invalid Email or Phone"
      );
      break;
    case "CodeDeliveryFailureException":
      toastr["error"](
        "Please verify your email with your admin.",
        "Code Delivery Failed"
      );
      break;
    case "CodeMismatchException":
      toastr["error"](
        "That code does not match the one sent.",
        "Code Mismatch"
      );
      break;
    case "ExpiredCodeException":
      toastr["warning"](
        "That code matches an expired code. Please request another.",
        "Expired Code"
      );
      break;
    case "InvalidEmailRoleAccessPolicyException":
      toastr["error"](err.message, "Invalid Username");
      break;
    case "InvalidPasswordException":
      toastr["warning"](
        "Wrong Username or Password provided. Please try again.",
        "Invalid Password or Username"
      );
      break;
    case "InternalErrorException":
    case "InvalidLambdaResponseException":
    case "InvalidParameterException":
    case "InvalidSmsRoleAccessPolicyException":
    case "InvalidSmsRoleTrustRelationshipException":
    case "InvalidUserPoolConfigurationException":
    case "LimitExceededException":
    case "ResourceNotFoundException":
    case "UnexpectedLambdaException":
    case "UserLambdaValidationException":
      toastr["error"](err.message, "Server Error");
      break;
    case "NotAuthorizedException":
      toastr["error"](err.message, "Not Authorized");
      break;
    case "PasswordResetRequiredException":
      toastr["warning"](err.message, "Reset Password Required");
      this.handleClickForgotPasswordOpen("Reset Password");
      break;
    case "TooManyFailedAttemptsException":
    case "TooManyRequestsException":
      toastr["warning"](err.message, "Login Attempts Exceeded");
      this.handleClickForgotPasswordOpen("Reset Password");
      break;
    case "UsernameExistsException":
      toastr["warning"](
        `Username: ${username} has already been used. Please try another.`,
        "Username Exists"
      );
      break;
    case "UserNotConfirmedException":
      toastr["warning"](err.message, "Confirmation Required");
      this.handleClickConfirmationCodeOpen(username);
      break;
    case "UserNotFoundException":
      toastr["error"](err.message, "User Not Found");
      break;
    default:
      toastr["error"](err.message, err.code);
  }
};
*/

/*
  authenticateUser = () => {
    var username = $("#login_username").val();
    var password = $("#passwordinput").val();
    // var preRegistered = checkIfPreRegistered("cognito_login_form");
    var authenticationData = {
      Username: username,
      Password: password
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
      authenticationData
    );
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
      this.state.poolData
    );
    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
      userData
    );
    cognitoUser.authenticateUser(authenticationDetails, {
      onComplete: function() {
        // resetAllButtons();
      },
      onSuccess: function(result) {
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
          cognitoUser.getSession(function(err, session) {
            if (err) {
              this.handleCognitoExceptions(err, username);
              return;
            }
            if (session.isValid()) {
              var registration = $("#create_account_form").serializeArray();
              var login = $("#cognito_login_form").serializeArray();
              var attributesArray=[];
              attributesArray.push({ name: "password", value: password });
              attributesArray.push({
                name: "JWTToken",
                value: result.getAccessToken().getJwtToken()
              });
              // NOTE: getSession must be called to authenticate user before calling getUserAttributes
              cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                  this.handleCognitoExceptions (err, username);
                  // Handle error
                } else {
                  for (i = 0; i < attributes.length; i++) {
                    attributesArray.push({
                      name: attributes[i].getName(),
                      value: attributes[i].getValue()
                    });
                  }
                }
                var all_data = registration.concat(login, attributesArray);
                $.ajax({
                  type: "POST",
                  url: "/login/index/login",
                  data: all_data,
                  dataType: "json",
                  complete: function() {
                    // resetAllButtons();
                  },
                  success: function(json) {
                    if (json["success"] === "1") {
                      toastr["success"](json["loginerr"], json["auth_result"]);
                      window.location.href = json["re_url"];
                    } else {
                      toastr["error"](json["loginerr"], json["auth_result"]);
                    }
                  },
                  error: function(err) {
                    toastr["error"](err, "Login Error");
                  }
                });
              });
            }
          });
        }
      },
      onFailure: function(err) {
        this.handleCognitoExceptions(err, username);
        // resetAllButtons();
      }
    });
  };
*/

/*
    */
