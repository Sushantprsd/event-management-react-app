import React from "react";
import classes from "./Button.module.css";
import { css } from "glamor";

const Button = (props) => {
    let styles = null;
    if (props.specialStyle) {
        styles = css(props.specialStyle);
    }

    let popupClasses = [classes.popuptext];
    let message = null;
    if ( props.disabled &&props.disabledMessage) {
        message = <span className={popupClasses.join(" ")}>{props.disabledMessage}</span>;
    }
    return (
        <button
            className={[classes.Button, classes[props.btnType]].join(" ")}
            {...styles}
            disabled={props.disabled ? true : null}
            onClick={props.clicked}
        >
            {message}
            {props.children}
        </button>
    );
};

export default Button;
