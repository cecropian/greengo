import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { secondaryListItems } from "./listItems";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";
import ChartistGraph from "react-chartist";
// @material-ui/core
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

import { Done, Loop, LibraryBooks, Ballot } from "@material-ui/icons";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Dialog from "@material-ui/core/Dialog";
import { ToastContainer } from "react-toastr";

import Signin from "./Signin";
import ForgotPassword from "./ForgotPassword";
import { emailsSubscriptionChart } from "variables/charts.jsx";
import styles from "assets/jss/material-dashboard-react/layouts/dashboard2Style.jsx";
// import AWSCognito from "assets/jss/material-dashboard-react/layouts/dashboard2Style.jsx";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Dashboard2 extends React.Component {
  state = {
    open: true,
    loginOpen: false,
    forgotOpen: false,
    value: 0,
    poolData: {
      UserPoolId: "us-east-1_1v5zwuw2i", // us-east-1_94f0CgD1D
      ClientId: "1hou8866pfj8co3edrf0f7pm5b" // 45j8368tdp71fr6eefvne38aje
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickLoginOpen = () => {
    this.setState({ loginOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginOpen: false });
  };

  handleClickForgotPasswordOpen = () => {
    this.handleLoginClose();
    this.setState({ forgotOpen: true });
  };

  handleForgotPasswordClose = () => {
    this.setState({ forgotOpen: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let container;

    return (
      <div className={classes.root}>
        <ToastContainer
          ref={ref => (container = ref)}
          className="toast-top-left"
        />
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Scrum Board" />
              <Tab label="Leader Board" />
              <Tab label="Players" />
            </Tabs>
            <Typography
              component="h1"
              variant="title"
              color="inherit"
              noWrap
              className={classes.title}
            />
            <IconButton color="inherit" onClick={this.handleClickLoginOpen}>
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <span>Scrum Game</span>
            <IconButton
              onClick={this.handleDrawerClose}
              style={{ color: "#D5D5D5" }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {value === 2 && (
            <TabContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Players</h4>
                      <p className={classes.cardCategoryWhite}>
                        List of Developers and QA
                      </p>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Name", "Title", "Team", "Points"]}
                        tableData={[
                          ["Dakota Rice", "Software Engineer II", "Enigman", "36,738"],
                          ["Minerva Hooper", "Software Engineer II", "Enigma", "23,789"],
                          ["Sage Rodriguez", "Software Engineer V", "Code Storm", "56,142"],
                          ["Philip Chaney", "Software Engineer III", "Code Storm", "38,735"],
                          ["Doris Greene", "Software Test Engineer I", "Enigma", "63,542"],
                          ["Mason Porter", "Software Test Engineer II", "Code Storm", "78,615"]
                        ]}
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card chart>
                    <CardHeader color="primary">
                      <ChartistGraph
                        className="ct-chart"
                        data={emailsSubscriptionChart.data}
                        type="Bar"
                        options={emailsSubscriptionChart.options}
                        responsiveOptions={
                          emailsSubscriptionChart.responsiveOptions
                        }
                        listener={emailsSubscriptionChart.animation}
                        style={{ height: "500px" }}
                      />
                    </CardHeader>
                  </Card>
                </GridItem>
              </GridContainer>
            </TabContainer>
          )}
          {value === 0 && (
            <TabContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <LibraryBooks />
                      </CardIcon>
                      <h3
                        className={classes.cardTitle}
                        style={{color: "black"}}
                      >
                        Backlog
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>Backlog</div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Ballot />
                      </CardIcon>
                      <h3
                        className={classes.cardTitle}
                        style={{color: "black"}}
                      >
                        TODO
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        TODO
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
                        <Loop />
                      </CardIcon>
                      <h3
                        className={classes.cardTitle}
                        style={{color: "black"}}
                      >
                        In Progess
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <LocalOffer />
                        In Progress
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Done />
                      </CardIcon>
                      <h3
                        className={classes.cardTitle}
                        style={{ color: "black" }}
                      >
                        Done
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Update />
                        Done
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </TabContainer>
          )}
        </main>
        <Dialog
          open={this.state.loginOpen}
          onClose={this.handleLoginClose}
          aria-labelledby="form-dialog-login"
        >
          <Signin forgotpassword={this.handleClickForgotPasswordOpen} />
        </Dialog>
        <Dialog
          open={this.state.forgotOpen}
          onClose={this.handleForgotPasswordClose}
          aria-labelledby="form-dialog-password"
        >
          <ForgotPassword />
        </Dialog>
      </div>
    );
  }
}

Dashboard2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard2);
