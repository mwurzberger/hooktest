import {SHIPS_FETCH_PENDING, SHIPS_FETCH_SUCCESS, SHIPS_FETCH_ERROR} from '../actions/shipListActions';

const initalFetchState = {
    data: [],
    error: null,
    isLoading: false
}

export default (state = initalFetchState, action) => {
    switch (action.type) {
        case SHIPS_FETCH_PENDING:
            return {
               ...state,
               error: null,
               isLoading: true
            }
        case SHIPS_FETCH_SUCCESS:
            return {
               data: action.data,
               error: null,
               isLoading: false
            }
        case SHIPS_FETCH_ERROR: 
            return {
               ...state,
               error: action.error,
               isLoading: false
            }
        default:
            return state
    }
}