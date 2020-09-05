import React, { Component } from "react";
import classes from "./Login.module.css";
import Input from "../../../components/UI/Input/Input";
import Logo from "../../../components/Logo/Logo";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { withRouter } from "react-router-dom";
import Spinner from "../../../components//UI/Spinner/Spinner";

class Login extends Component {
    state = {
        inputForm: {
            email: {
                label: "Email",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "17rem",
                    margin: "0 0rem 0 0.2rem",
                },
                elementConfig: {
                    required: true,
                    placeholder: "Email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                label: "Password",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "17rem",
                    margin: "2rem 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    type: "Password",
                    required: true,
                    placeholder: "password",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
        },
        validationError: "",
        formIsValid: false,
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            isValid = value.includes("@") && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedInputForm = {
            ...this.state.inputForm,
        };
        const updatedFormElement = { ...updatedInputForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedInputForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedInputForm) {
            formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ inputForm: updatedInputForm, formIsValid: formIsValid });
    };

    submitHandler = (e) => {
        e.preventDefault();
        this.props.authSubmitHandler(this.state.inputForm.email.value, this.state.inputForm.password.value);
    };

    RedirectSignUp = () => {
        this.props.history.push("/signup");
    };

    render() {
        let formElementArray = [];
        for (let key in this.state.inputForm) {
            formElementArray.push({
                id: key,
                config: this.state.inputForm[key],
            });
        }
        let button = (
            <div className={classes.FormSubmit}>
                <button
                    className={classes.LoginButton}
                    onClick={(e) => this.submitHandler(e)}
                    disabled={!this.state.formIsValid ? true : null}
                >
                    <span>Login</span>
                </button>
                <span className={classes.SignUp} onClick={this.RedirectSignUp}>
                    Not a user? Sign Up
                </span>
            </div>
        );

        if (this.props.auth.loading) {
            button = <Spinner />;
        }

        let form = (
            <form className={classes.InputForm}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                {formElementArray.map((formElement) => (
                    <Input
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        key={formElement.id}
                        label={formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        specialStyle={formElement.config.specialStyle}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <span className={classes.ErrorSpan}>{this.props.auth.error ? this.props.auth.error : null}</span>
                {button}
            </form>
        );

        return <div className={classes.Login}>{form} </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authSubmitHandler: (email, password) => dispatch(actions.auth(email, password)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
