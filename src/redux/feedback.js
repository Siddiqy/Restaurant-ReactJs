import * as ActionTypes from "./ActionTypes";

export const Feedback = (state = {
        feedback: []
    }, action) => {
    switch(action.type) {
    case ActionTypes.POST_FEEDBACK:
        var feedback = action.payload;
        return {...state, feedback: state.feedback.concat(feedback)};
    default:
        return state;
    }
}