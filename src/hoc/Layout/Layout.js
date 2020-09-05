import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
    state = {
        showSideDrawer: false,
    };
    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };
        });
    };
    render() {
        return (
            <div className={classes.MainContainer}>
                <div className={classes.Header}>
                    <SideDrawer
                        authState={this.props.auth}
                        drawerToggleClicked={this.SideDrawerToggleHandler}
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.SideDrawerClosedHandler}
                    />
                    <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} />
                </div>
                <main className={classes.Main}>{this.props.children}</main>
                <div className={classes.Footer}>
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
