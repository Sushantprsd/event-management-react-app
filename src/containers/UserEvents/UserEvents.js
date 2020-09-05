import React, { Component } from "react";
import classes from "./UserEvents.module.css";
import CustomBadge from "../../components/HomePage/Badge";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class UserEvent extends Component {
    componentDidMount() {
        this.props.fetchAllEvent();
    }
    render() {
        let allEvents = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );

        if (!this.props.event.myEventsFetchLoading) {
            let events = this.props.event.myEvents;
            allEvents = (
                <div>
                    <div className={classes.Content}>
                    {events.map((event) => {
                            return (
                                <CustomBadge
                                    key={event._id}
                                    id = {event._id}
                                    imageUrl={this.props.event.ipName + event.public.imageUrl}
                                    event={event}
                                    isAuthenticated ={this.props.auth.isAuthenticated}
                                    token = {this.props.auth.token}
                                    enrollLoading = {this.props.event.myEventsFetchError}
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
        auth:state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllEvent: () => dispatch(actions.fetchUserEvent()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEvent);
