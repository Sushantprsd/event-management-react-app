import * as actionTypes from "../actionTypes";
import Axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userDetails) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userDetails: userDetails,
    };
};


export const signupFail = (error)=>{
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error,
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};


export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password,
        };
        let url = "https://test-eventmanagement.herokuapp.com/auth/login";
        Axios.post(url, body)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.name);
                dispatch(authSuccess(response.data.token, response.data.name));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.message));
            });
    };
};

export const authSignUp = (email, password, name) => {
    return (dispatch) => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password,
            name: name,
        };
        let url = "https://test-eventmanagement.herokuapp.com/auth/signup";
        Axios.post(url, body)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.name);
                dispatch(authSuccess(response.data.token, response.data.name));
            })
            .catch((err) => {
                dispatch(signupFail(err.response.data.message));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, user));
        }
    };
};
