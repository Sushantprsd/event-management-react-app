import React, { Component } from "react";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class SideDrawer extends Component {
    AuthLoginHandler = () => {
        this.props.history.push("/login");
    };


    logoutHandler = () => {
        this.props.history.push('/logout')
    };

    addEventHandler = () => {
        this.props.history.push("/event/add");
    };

    enrolledHandler = () => {
        this.props.history.push("/event/enrolled");
    };

    goToMyEventHandler = () => {
        this.props.history.push("/my/events");
    };

    render() {
        let attachedClasses = [classes.SideDrawer, classes.Close];
        if (this.props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
        let list = (
            <ul>
                <li
                    onClick={() => {
                        this.props.history.push("/");
                    }}
                >
                    Home
                </li>

                <li onClick={this.AuthLoginHandler}>LogIn</li>
            </ul>
        );

        if (this.props.authState.isAuthenticated) {
            list = (
                <ul>
                    <li
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                    >
                        Home
                    </li>

                    <li onClick={this.addEventHandler}>Add Event</li>
                    <li onClick={this.enrolledHandler}>Enrolled Event</li>
                    <li onClick={this.goToMyEventHandler}>{this.props.authState.userDetails.split(" ")[0]}</li>
                    <li onClick={this.logoutHandler}>Log Out</li>
                </ul>
            );
        }
        return (
            <div>
                <BackDrop show={this.props.open} clicked={this.props.closed} />
                <div className={attachedClasses.join(" ")} onClick={this.props.closed}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>{list}</nav>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: () => dispatch(actions.logout()),
    };
};

const mapStateToProps = (state) => {
    return {
        authState: state.auth,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideDrawer));
