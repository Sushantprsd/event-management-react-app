import React, { Component } from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import SearchBar from "../../UI/SearchBar/SearchBar";
import NavIcons from "../../UI/NavIcons/NavIcons";
import { NavLink, withRouter } from "react-router-dom";
import { connect} from "react-redux";
import * as actions from "../../../store/actions/index";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

class Toolbar extends Component {
    AuthLoginHandler = () => {
        this.props.history.push("/login");
    };

    logoutHandler = () => {
        this.props.history.push('/')
        this.props.logoutHandler();
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
        let userAuth = (
            <div onClick={this.AuthLoginHandler} className="LoginButton">
                <span>LogIn</span>
            </div>
        );
        if (this.props.authState.isAuthenticated) {
            userAuth = (
                <NavIcons
                    logoutEvent={this.logoutHandler}
                    addEvent={this.addEventHandler}
                    enrolledEvent={this.enrolledHandler}
                    userName={this.props.authState.userDetails.split(" ")[0]}
                    goToMyEvent={this.goToMyEventHandler}
                />
            );
        }

        return (
            <div className="MainContainerHeader">
                <header className="Toolbar">
                    <div className="Block">
                        <DrawerToggle clicked={this.props.drawerToggleClicked} />
                        <div className="Logo">
                            <NavLink to={"/"}>
                                <Logo />
                            </NavLink>
                        </div>
                        <div className="SearchBarContainer">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="NavIconsContainer">{userAuth}</div>
                </header>
                <div className="FancyShadow"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));
