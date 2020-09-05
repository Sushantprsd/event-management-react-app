import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
    page: 1,
    events: [],
    error: false,
    eventFetchLoading: false,
    ipName: "https://test-eventmanagement.herokuapp.com/",
    formSubmissionLoading: false,
    formSubmissionSuccess:false,
    formSubmissionError: null,
    eventEnrollLoading: false,
    eventEnrollError: null,
    checkEnrollmentLoading: false,
    myEnrolledEvents: [],
    myEnrolledEventsFetchLoading: false,
    myEnrolledEventsFetchError: null,
    myEvents: [],
    myEventsFetchLoading: false,
    myEventsFetchError: null,
};

const eventFetchStart = (state, action) => {
    return updateObject(state, { error: null, eventFetchLoading: true });
};

const eventFetchSuccess = (state, action) => {
    return updateObject(state, {
        events: action.events,
        error: false,
        eventFetchLoading: false,
    });
};

const eventFetchFail = (state, action) => {
    return updateObject(state, {
        formSubmissionError: action.error,
        formSubmissionLoading: false,
    });
};

const formSubmissionStart = (state, action) => {
    return updateObject(state, { error: null, formSubmissionLoading: true });
};

const formSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        formSubmissionLoading: false,
        formSubmissionSuccess:true
    });
};

const formSubmissionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        formSubmissionLoading: false,
    });
};

const eventEnrollStart = (state, action) => {
    return updateObject(state, { eventEnrollLoading: true, eventEnrollError: null });
};

const eventEnrollSuccess = (state, action) => {
    return updateObject(state, {
        eventEnrollLoading: false,
        eventEnrollError: null,
    });
};

const eventEnrollFail = (state, action) => {
    return updateObject(state, {
        eventEnrollLoading: false,
        eventEnrollError: action.message,
    });
};

const enrolledEventFetchStart = (state, action) => {
    return updateObject(state, { myEnrolledEventsFetchLoading: true, myEnrolledEventsFetchError: null });
};

const enrolledEventFetchSuccess = (state, action) => {
    return updateObject(state, {
        myEnrolledEvents: action.events,
        myEnrolledEventsFetchLoading: false,
        myEnrolledEventsFetchError: null,
    });
};

const enrolledEventFetchFail = (state, action) => {
    return updateObject(state, {
        myEnrolledEventsFetchLoading: false,
        myEnrolledEventsFetchError: action.error,
    });
};

const fetchUserEventStart = (state, action) => {
    return updateObject(state, {
        myEventsFetchLoading: true,
        myEventsFetchError: null,
    });
};

const fetchUserEventSuccess = (state, action) => {
    return updateObject(state, {
        myEvents: action.events,
        myEventsFetchLoading: false,
        myEventsFetchError: null,
    });
};

const fetchUserEventFail = (state, action) => {
    return updateObject(state, {
        myEventsFetchLoading: false,
        myEventsFetchError: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EVENT_FETCH_START:
            return eventFetchStart(state, action);
        case actionTypes.EVENT_FETCH_SUCCESS:
            return eventFetchSuccess(state, action);
        case actionTypes.EVENT_FETCH_FAIL:
            return eventFetchFail(state, action);
        case actionTypes.FORM_SUBMISSION_START:
            return formSubmissionStart(state, action);
        case actionTypes.FORM_SUBMISSION_SUCCESS:
            return formSubmissionSuccess(state, action);
        case actionTypes.FORM_SUBMISSION_FAIL:
            return formSubmissionFail(state, action);
        case actionTypes.EVENT_ENROLL_START:
            return eventEnrollStart(state, action);
        case actionTypes.EVENT_ENROLL_SUCCESS:
            return eventEnrollSuccess(state, action);
        case actionTypes.EVENT_ENROLL_FAIL:
            return eventEnrollFail(state, action);
        case actionTypes.ENROLLED_EVENT_FETCH_START:
            return enrolledEventFetchStart(state, action);
        case actionTypes.ENROLLED_EVENT_FETCH_SUCCESS:
            return enrolledEventFetchSuccess(state, action);
        case actionTypes.ENROLLED_EVENT_FETCH_FAIL:
            return enrolledEventFetchFail(state, action);
        case actionTypes.FETCH_USER_EVENT_START:
            return fetchUserEventStart(state, action);
        case actionTypes.FETCH_USER_EVENT_SUCCESS:
            return fetchUserEventSuccess(state, action);
        case actionTypes.FETCH_USER_EVENT_FAIL:
            return fetchUserEventFail(state, action);
        default:
            return state;
    }
};

export default reducer;
