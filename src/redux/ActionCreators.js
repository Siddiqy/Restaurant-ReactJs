import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error'+ Response.status + ': ' +Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(comments => dispatch(addComment(comments)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });

}

export const addComment = (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comments
});

export const postFeedback = (values) => (dispatch) => {
    
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error'+ Response.status + ': ' +Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(feedback => { dispatch(addFeedback(feedback)); alert('Thank you for your feedback!\n ' + JSON.stringify(feedback));})
    .catch(error =>  { console.log('post feedback', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const addFeedback = (feedback) => ({
    type: ActionTypes.POST_FEEDBACK,
    payload: feedback
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error'+ Response.status + ': ' +Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error'+ Response.status + ': ' +Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error'+ Response.status + ': ' +Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(Response => {
        if (Response.ok) {
            return Response;
        }
        else {
            var error = new Error('Error' + Response.status + ': ' + Response.statusText);
            error.Response = Response;
            throw error;
        }
    },
    error => {
        var errormess = new Error(error.message);
        throw errormess;
    })
    .then(Response => Response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersLoading(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILDE,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});