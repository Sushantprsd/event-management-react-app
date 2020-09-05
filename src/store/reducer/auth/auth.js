import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    authRedirect: "/",
    userDetails: null,
    signUpError: null,
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        userDetails: action.userDetails,
        token: action.idToken,
        error: null,
        loading: false,
        isAuthenticated: true,
    });
};

const signUpFail = (state, action) => {
    return updateObject(state, {
        signUpError: action.error,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, isAuthenticated: false, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signUpFail(state, action);
        default:
            return state;
    }
};

export default reducer;
