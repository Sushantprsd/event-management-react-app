import React, { useState } from "react";
import classes from "./LocationDrop.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import DropDown from "./DropDown/DropDown";
import onClickOutside from 'react-onclickoutside'

const LocationDrop = function(props){
    const [openDropDown, setOpenDropDown] = useState(false);
    let dropDownClasses = [classes.LocationDrop];
    if (openDropDown) {
        dropDownClasses = [classes.LocationDrop, classes.LocationDropOpen];
    }
    LocationDrop.handleClickOutside = () => setOpenDropDown(false);
    return (
        <div onClick={() => {setOpenDropDown(!openDropDown)}} className={dropDownClasses.join(" ")}>
            <IconContext.Provider value={{ color: "#9C9595", size: "3rem" }}>
                <span>
                    <RiArrowDropDownLine />
                </span>
            </IconContext.Provider>
            <div className={classes.DropDown}>
                <DropDown>
                    <li>{1}</li>
                    <li>{1}</li>
                    <li>{1}</li>
                    <li>{1}</li>
                </DropDown>
            </div>
        </div>
    );
};

const clickOutsideConfig = {
    handleClickOutside: () => LocationDrop.handleClickOutside
  };
  

export default onClickOutside(LocationDrop,clickOutsideConfig);
