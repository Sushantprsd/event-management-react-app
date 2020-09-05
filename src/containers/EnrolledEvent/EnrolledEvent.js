import React, { Component } from "react";
import classes from "./EnrolledEvent.module.css";
import CustomBadge from "../../components/HomePage/Badge";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class EnrolledEvent extends Component {
    componentDidMount() {
        this.props.fetchAllEvent();
    }
    render() {
        let allEvents = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );

        if (!this.props.event.myEnrolledEventsFetchLoading) {
            let events = this.props.event.myEnrolledEvents;
            allEvents = (
                <div>
                    <div className={classes.Content}>
                        {events.map((event) => {
                            
                            return (
                                <CustomBadge
                                    key={event._id}
                                    id={event.event[0]._id}
                                    imageUrl={this.props.event.ipName + event.event[0].public.imageUrl}
                                    event={event.event[0]}
                                    isAuthenticated={this.props.auth.isAuthenticated}
                                    token={this.props.auth.token}
                                    enrollLoading={this.props.event.eventEnrollLoading}
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
        fetchAllEvent: () => dispatch(actions.enrolledEvent()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledEvent);
