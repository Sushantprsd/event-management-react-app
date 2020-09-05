import * as actionTypes from "../actionTypes";
import Axios from "axios";

export const eventFetchStart = () => {
    return {
        type: actionTypes.EVENT_FETCH_START,
    };
};

export const eventFetchSuccess = (events) => {
    return {
        type: actionTypes.EVENT_FETCH_SUCCESS,
        events: events,
    };
};

export const eventFetchFail = (error) => {
    return {
        type: actionTypes.EVENT_FETCH_FAIL,
        error: error,
    };
};

export const formSubmissionStart = () => {
    return {
        type: actionTypes.FORM_SUBMISSION_START,
    };
};

export const formSubmissionSuccess = () => {
    return {
        type: actionTypes.FORM_SUBMISSION_SUCCESS,
    };
};

export const formSubmissionFail = (message) => {
    return {
        type: actionTypes.FORM_SUBMISSION_FAIL,
        message: message,
    };
};

export const eventFetch = (page) => {
    return (dispatch) => {
        dispatch(eventFetchStart());
        let url = `https://test-eventmanagement.herokuapp.com/event/all?page=${page}`;
        Axios.get(url)
            .then((response) => {
                dispatch(eventFetchSuccess(response.data.data));
            })
            .catch((err) => {
                dispatch(eventFetchFail(err.response.data.message));
            });
    };
};

export const addEvent = (file) => {
    return (dispatch) => {
        dispatch(formSubmissionStart());
        let url = "https://test-eventmanagement.herokuapp.com/user/event/add";
        const token = localStorage.getItem("token");
        Axios.post(url, file, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
         
                dispatch(formSubmissionSuccess());
            })
            .catch((err) => {
                dispatch(formSubmissionFail(err.response.data.message));
            });
    };
};

export const eventEnrollStart = () => {
    return {
        type: actionTypes.EVENT_ENROLL_START,
    };
};

export const eventEnrollSuccess = () => {
    return {
        type: actionTypes.EVENT_ENROLL_SUCCESS,
    };
};

export const eventEnrollFail = (message) => {
    return {
        type: actionTypes.EVENT_ENROLL_FAIL,
        message: message,
    };
};

export const enrollEvent = (eventId) => {
    return (dispatch) => {
        dispatch(eventEnrollStart());

        let url = `https://test-eventmanagement.herokuapp.com/user/event/book/${eventId}`;
        const token = localStorage.getItem("token");
        Axios.post(
            url,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        )
            .then((response) => {
                
                dispatch(eventEnrollSuccess());
            })
            .catch((err) => {
                dispatch(eventEnrollFail(err.response.data.message));
            });
    };
};

export const checkEnrollmentEventStart = () => {
    return {
        type: actionTypes.FETCH_ENROL_EVENT_START,
    };
};

export const checkEnrollmentEventSuccess = () => {
    return {
        type: actionTypes.FETCH_ENROL_EVENT_SUCCESS,
    };
};

export const checkEnrollmentEventFail = (message) => {
    return {
        type: actionTypes.FETCH_ENROL_EVENT_FAIL,
        message: message,
    };
};

export const checkEnrollment = (eventId) => {
    return (dispatch) => {
        dispatch(checkEnrollmentEventStart());
       
        let url = `https://test-eventmanagement.herokuapp.com/event/enrolled/${eventId}`;
        const token = localStorage.getItem("token");
        Axios.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                dispatch(checkEnrollmentEventSuccess());
            })
            .catch((err) => {
                dispatch(checkEnrollmentEventFail(err.response.data.message));
            });
    };
};

export const enrolledEventStart = () => {
    return {
        type: actionTypes.ENROLLED_EVENT_FETCH_START,
    };
};

export const enrolledEventSuccess = (events) => {
    return {
        type: actionTypes.ENROLLED_EVENT_FETCH_SUCCESS,
        events: events,
    };
};

export const enrolledEventFail = (error) => {
    return {
        type: actionTypes.ENROLLED_EVENT_FETCH_FAIL,
        error: error,
    };
};

export const enrolledEvent = () => {
    return (dispatch) => {
        dispatch(enrolledEventStart());
        let url = `https://test-eventmanagement.herokuapp.com/user/event/enrolled/all`;
        const token = localStorage.getItem("token");
        Axios.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                dispatch(enrolledEventSuccess(response.data.data));
            })
            .catch((err) => {
                dispatch(enrolledEventFail(err.response.data.message));
            });
    };
};

export const fetchUserEventStart = () => {
    return {
        type: actionTypes.FETCH_USER_EVENT_START,
    };
};

export const fetchUserEventSuccess = (events) => {
    return {
        type: actionTypes.FETCH_USER_EVENT_SUCCESS,
        events: events,
    };
};

export const fetchUserEventFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_EVENT_FAIL,
        error: error,
    };
};

export const fetchUserEvent = () => {
    return (dispatch) => {
        dispatch(fetchUserEventStart());
        let url = `https://test-eventmanagement.herokuapp.com/user/event/all`;
        const token = localStorage.getItem("token");
        Axios.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                dispatch(fetchUserEventSuccess(response.data.result));
            })
            .catch((err) => {
                dispatch(fetchUserEventFail(err.response.data.message));
            });
    };
};
