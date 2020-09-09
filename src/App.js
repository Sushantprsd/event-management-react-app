import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect, withRouter } from "react-router";
import Layout from "./hoc/Layout/Layout.js";
import HomePage from "./containers/HomePage/HomePage";
import Login from "./containers/Auth/login/Login";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import SignUp from "./containers/Auth/SignUp/SignUp";
import AddEvent from "./containers/AddEvent/AddEvent";
import EnrolledEvent from "./containers/EnrolledEvent/EnrolledEvent";
import UserEvents from "./containers/UserEvents/UserEvents";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let route = (
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/" component={HomePage} />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            route = (
                <Switch>
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/my/events" exact component={UserEvents} />
                    <Route path="/event/enrolled" exact component={EnrolledEvent} />
                    <Route path="/event/add" exact component={AddEvent} />
                    <Route path="/" exact component={HomePage} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{route}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(App));
