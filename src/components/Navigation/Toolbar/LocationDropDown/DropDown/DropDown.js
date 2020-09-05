import React from "react";
import classes from "./DropDown.module.css";
import onClickOutside from "react-onclickoutside";
const DropDown = (props) => {
    let DropdownClasses = [classes.Dropdown];
    return <ul className={classes.DropDown}>{props.children}</ul>;
};

export default DropDown;
