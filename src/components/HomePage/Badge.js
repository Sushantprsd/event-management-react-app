import React, { useState } from "react";
import classes from "./Badge.module.css";
import Spinner from "../UI/Spinner/Spinner";
import Axios from "axios";

const CustomBadge = (props) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [enrolled, setEnrolled] = useState(false);
    let date = props.event.public.date.split("-");
    let month = date[1];
    let registerButton = (
        <div onClick={props.enrollToEvent} className={classes.Register}>
            <span>Register</span>
        </div>
    );

    if (!props.isAuthenticated) {
        registerButton = (
            <div onClick={props.gotToLogIn} className={classes.Register}>
                <span>Login to Register</span>
            </div>
        );
    }
    if (enrolled) {
        registerButton = (
            <div className={classes.Register}>
                <span>Enrolled</span>
            </div>
        );
    }

    if (props.enrollLoading) {
        registerButton = <Spinner />;
    }

    if (props.isAuthenticated && props.token) {
        let url = `https://test-eventmanagement.herokuapp.com/user/event/enrolled/${props.id}`;
        Axios.get(url, {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((response) => {
                setEnrolled(response.data.data);
            })
            .catch((err) => {});
    }

    return (
        <div className={classes.Badge}>
            <div className={classes.Img}>
                <div className={classes.BackDrop}>
                    <div className={classes.BackDropDescription}>
                        <h1>{props.event.public.location.state.toUpperCase()}</h1>
                        <h2>{props.event.public.location.city.toUpperCase()}</h2>
                        <h5>{props.event.public.description.toUpperCase()}</h5>
                    </div>
                </div>
                <img className={classes.imgContent} src={props.imageUrl} alt="" />
            </div>
            <div className={classes.Details}>
                <div className={classes.Description}>
                    <div className={classes.Tittle}>
                        <h2>{props.event.public.name.toUpperCase()}</h2>
                        <p>{props.event.public.organizerName.toUpperCase()}</p>
                    </div>
                    {registerButton}
                </div>
                <div className={classes.Timing}>
                    <h5>
                        {date[2]} {monthNames[month - 1]} {date[0]}
                    </h5>
                    <h5>{props.event.public.time} Onwards</h5>
                </div>
            </div>
        </div>
    );
};

export default CustomBadge;
