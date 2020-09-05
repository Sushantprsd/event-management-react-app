import React from "react";
import "./NavIcons.css";
// import user from '../../../assets/icons/149086-essential-set/png/user-3.png'
import { MdAdd, MdEventSeat } from "react-icons/md";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";

const NavIcons = (props) => {
    return (
        <IconContext.Provider value={{ color: "#626161", size: "1.5rem" }}>
            <div className="NavIcons">
                <div className="NavIcon" onClick={props.addEvent}>
                    <span>
                        <MdAdd />
                    </span>
                    <span>Add Event</span>
                </div>
                <div className="NavIcon" onClick={props.enrolledEvent}>
                    <span>
                        <MdEventSeat />
                    </span>
                    <span>Enrolled</span>
                </div>
                <div className="NavIcon" onClick={props.logoutEvent}>
                    <span>
                        <RiLogoutBoxRLine />
                    </span>
                    <span>Logout</span>
                </div>
                <div className="NavIcon profile" onClick={props.goToMyEvent} title="My Events">
                    <span className="profileName">{props.userName}</span>
                </div>
            </div>
        </IconContext.Provider>
    );
};

export default NavIcons;
