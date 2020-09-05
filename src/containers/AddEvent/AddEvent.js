import React, { Component } from "react";
import classes from "./AddEvent.module.css";
import Input from "../../components/UI/Input/Input";
import Logo from "../../components/Logo/Logo";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components//UI/Spinner/Spinner";
import { withRouter } from "react-router";

class AddEvent extends Component {
    state = {
        inputForm: {
            name: {
                label: "Name Of Event",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    required: true,
                    placeholder: "Name Of Event",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            description: {
                label: "Description",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    required: true,
                    placeholder: "description",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            city: {
                label: "City Name",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    required: true,
                    placeholder: "City",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            state: {
                label: "State Name",
                elementType: "select",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    required: true,
                    options: [
                        { value: "Delhi", displayValue: "Delhi" },
                        { value: "Mumbai", displayValue: "Mumbai" },
                        { value: "Pune", displayValue: "Pune" },
                        { value: "Goa", displayValue: "Goa" },
                        { value: "Rajasthan", displayValue: "Rajasthan" },
                        { value: "Gujrat", displayValue: "Gujrat" },
                    ],
                    required: true,
                    placeholder: "State",
                },
                value: "delhi",
                validation: {
                },
                valid: true,
                touched:true
            },
            date: {
                label: "Date",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    type: "date",
                    required: true,
                    placeholder: "Date",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            time: {
                label: "Time",
                elementType: "input",
                specialStyle: {
                    display: "inline-block",
                    width: "100%",
                    margin: "0 0rem 1rem 0.2rem",
                },
                elementConfig: {
                    type: "time",
                    required: true,
                    placeholder: "Time",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
        },
        imagePicked: false,
        validationError: "",
        selectedFile: null,
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

    RedirectLogin = () => {
        this.props.history.push("/login");
    };

    onFileChange = (event) => {
        const updatedState = {
            ...this.state,
        };
        updatedState.selectedFile = event.target.files[0];
        if (updatedState.selectedFile) {
            updatedState.imagePicked = true;
        } else {
            updatedState.imagePicked = false;
        }
        this.setState(updatedState);
    };

    submitHandler = (event) => {
        event.preventDefault();
        const fs = new FormData();
        fs.append("image", this.state.selectedFile, this.state.selectedFile.name);
        fs.append("date", this.state.inputForm.date.value);
        fs.append("time", this.state.inputForm.time.value);
        fs.append("state", this.state.inputForm.state.value);
        fs.append("city", this.state.inputForm.city.value);
        fs.append("description", this.state.inputForm.description.value);
        fs.append("name", this.state.inputForm.name.value);
        this.props.formSubmitHandler(fs);
    };

    render() {
        let formElementArray = [];
        for (let key in this.state.inputForm) {
            formElementArray.push({
                id: key,
                config: this.state.inputForm[key],
            });
        }

        if(this.props.event.formSubmissionSuccess){
            this.props.history.push("/");
        }

        let buttonClass = [classes.LoginButton];

        let button = (
            <div className={classes.FormSubmit}>
                <button
                    className={buttonClass.join(" ")}
                    onClick={this.submitHandler}
                    disabled={!this.state.formIsValid || !this.state.imagePicked ? true : null}
                >
                    Add
                </button>
            </div>
        );

        if (this.props.event.formSubmissionLoading) {
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
                <input
                    type="file"
                    required
                    onChange={(e) => {
                        this.onFileChange(e);
                    }}
                />
                <span className={classes.ErrorSpan}>
                    {this.props.event.formSubmissionError ? this.props.event.formSubmissionError : null}
                </span>
                {button}
            </form>
        );

        return (
            <div className={classes.Login}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        formSubmitHandler: (file) => dispatch(actions.addEvent(file)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEvent));
