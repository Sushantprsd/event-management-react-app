import React, { Component } from "react";
import classes from "./HomePage.module.css";
import CustomCarousel from "../../components/Carousel/Carousal";
import CustomBadge from "../../components/HomePage/Badge";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchAllEvent(1);
    }
    enrollEvent = (eventId) => {
        this.props.enrollToEvent(eventId);
    };
    gotToLogIn = () => {
        this.props.history.push("/login");
    };
    render() {
        let allEvents = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );

        if (!this.props.event.eventFetchLoading) {
            let events = this.props.event.events;
            allEvents = (
                <div>
                    <div>
                        <CustomCarousel />
                    </div>
                    <div className={classes.Content}>
                        {events.map((event) => {
                            return (
                                <CustomBadge
                                    key={event._id}
                                    id={event._id}
                                    imageUrl={this.props.event.ipName + "" + event.public.imageUrl}
                                    event={event}
                                    enrollToEvent={(key) => this.enrollEvent(event._id)}
                                    isAuthenticated={this.props.auth.isAuthenticated}
                                    token={this.props.auth.token}
                                    enrollLoading={this.props.event.eventEnrollLoading}
                                    gotToLogIn={this.gotToLogIn}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }

        return <div className={classes.HomePage}>{allEvents}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllEvent: (page) => dispatch(actions.eventFetch(page)),
        enrollToEvent: (eventId) => dispatch(actions.enrollEvent(eventId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
